import React, { Component } from 'react';
import './map-area.component.css';

import GoogleMap from 'google-map-react';
import Svg from '../svg/svg.component';
import Marker from '../marker/marker.component';

const DEFAULT_REF = 'map';

class MapArea extends Component {

  state = {
    center: {lat: 59.955413, lng: 30.337844},
    zoom: 13,
    draggable: true,
    moved: false,
    lat: 59.955413,
    lng: 30.337844,
    markers: [],
    bounds: [],
    coordinates: {
      coords: [],
      options: {
        strokeWidth: 1,
        stroke: '#222',
        strokeOpacity: '0.8',
        fillOpacity: '0',
        },
    },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.action.name === 'add') {
      this.onAddAction(nextProps);
    }

    if (nextProps.action.name === 'remove') {
      this.onRemoveAction(nextProps);
    }

    if (nextProps.action.name === 'change') {
      this.onChangeAction(nextProps);
    }
  }

  onAddAction(nextProps) {
    let coordinates = this.clone(this.state.coordinates);

    coordinates.coords.push({
      lat: this.state.center.lat,
      lng: this.state.center.lng,
    });

    this.setState({
      markers: [...this.state.markers, {
        name: nextProps.marker.name,
        lat: this.state.center.lat,
        lng: this.state.center.lng,
      }],
      coordinates,
    });
  }

  onRemoveAction(nextProps) {
    const markers = [
      ...this.state.markers.slice(0, nextProps.action.oldIndex),
      ...this.state.markers.slice(nextProps.action.oldIndex + 1)
    ];

    let coordinates = this.clone(this.state.coordinates);

    coordinates.coords = markers.map( marker => {
      return {lat: marker.lat, lng: marker.lng};
    });

    this.setState({
        markers,
        coordinates
    })
  }

  onChangeAction(nextProps) {
    let markers = this.clone(this.state.markers);
    let changed = markers.splice(nextProps.action.oldIndex, 1);

    markers.splice(nextProps.action.newIndex, 0, ...changed);

    let coordinates = this.clone(this.state.coordinates);

    coordinates.coords = markers.map( marker => {
      return {lat: marker.lat, lng: marker.lng};
    });

    this.setState({
        markers,
        coordinates,
    });
  }

  onMarkerMouseMove(childKey, childProps, mouse) {
    const markers = this.clone(this.state.markers);

    markers[childKey].lat = mouse.lat;
    markers[childKey].lng = mouse.lng;

    let coordinates = this.clone(this.state.coordinates);

    coordinates.coords = markers.map( marker => {
      return {lat: marker.lat, lng: marker.lng};
    });

    let moved = !this.state.draggable

    this.setState({ markers, coordinates, moved });
  }

  onMarkerMouseUp() {
    this.setState({draggable: true});
  }

  onMarkerMouseDown() {
    this.setState({draggable: false, moved: false});
  }

  onBoundsChange(center, zoom, bounds) {
    this.setState({
      bounds: bounds,
    });
  }

  onChange = ({center, zoom}) => {
    this.setState({
      center,
      zoom,
    });
  }

  onGoogleApiLoaded({map, maps}) {
    this.setState({
        googleApiLoaded: true,
        map,
        maps
    });
  }

  drawSvg(ref) {
    if (!this.state.googleApiLoaded || this.state.bounds.length === 0)
      return null;
    else
      return (
        <Svg
          lat={this.state.bounds[0]}
          lng={this.state.bounds[1]}
          coordinates={this.state.coordinates}
          bounds={this.state.bounds}
          zoom={this.state.zoom}
          height={this.refs[ref] ? this.refs[ref].offsetHeight : 0}
          width={this.refs[ref] ? this.refs[ref].offsetWidth : 0} />
      );
  }

  clone(object) {
    return JSON.parse(JSON.stringify(object));
  }

  render() {
    const markersPoints = this.state.markers.map((marker, index) =>
      <Marker
         key={index}
         index={index}
         marker={marker}
         lat={marker.lat}
         lng={marker.lng}
         moved={this.state.moved}
         maps={this.state.maps}
      />
    );
    const ref = this.props.ref || DEFAULT_REF;

    return (
      <div className="Google-map" id={this.props.id} ref={ref}>
       <GoogleMap
        draggable={this.state.draggable}
        onChange={this.onChange}
        center={this.state.center}
        zoom={this.state.zoom}
        onChildMouseDown={this.onMarkerMouseDown.bind(this)}
        onChildMouseUp={this.onMarkerMouseUp.bind(this)}
        onChildMouseMove={this.onMarkerMouseMove.bind(this)}
        onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
        onBoundsChange={this.onBoundsChange.bind(this)}
        yesIWantToUseGoogleMapApiInternals
        options={this.state.options}
        bootstrapURLKeys={{
          key: 'AIzaSyD2gOGU8LU5VZZbuPP361HCU7TUquOZy-U',
          language: 'ru',
          region: 'ru',
        }}
        >
        {markersPoints}
        {this.state.coordinates.coords.length ? this.drawSvg(ref) : null}
      </GoogleMap>
    </div>
    );
  }
}

export default MapArea;
