import React, { Component } from 'react';
import './map-area.component.css';

import  GoogleMap  from 'google-map-react';
import Svg  from '../svg-component/svg.component';

const DEFAULT_REF = 'map';
const DEFAULT_HEIGHT = '100px';

class SimpleMap extends Component {

  state = {
    center: {lat: 59.955413, lng: 30.337844},
    zoom: 13,
    draggable: true,
    lat: 59.955413,
    lng: 30.337844,
    markers: [],
    bounds: [],
    coordinates: {
      coords: [
        { lat: 59.955413, lng: 30.337844 },
        { lat: 56.955413, lng: 32.337844 },
      ],
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
      let coordinates = JSON.parse(JSON.stringify(this.state.coordinates));

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

    if (nextProps.action.name === 'remove') {
      this.setState({
          markers: [
            ...this.state.markers.slice(0, nextProps.action.oldIndex),
            ...this.state.markers.slice(nextProps.action.oldIndex + 1)
          ],
      })
    }
  }

  onMarkerMouseMove(childKey, childProps, mouse) {
    let markers = JSON.parse(JSON.stringify(this.state.markers));
    let coordinates = JSON.parse(JSON.stringify(this.state.coordinates));

    markers[childKey].lat = mouse.lat;
    markers[childKey].lng = mouse.lng;

    coordinates.coords.push({
      lat: this.state.center.lat,
      lng: this.state.center.lng,
    });
    this.setState({ markers, coordinates });
  }

  onMarkerMouseUp(childKey, childProps, mouse) {
    this.setState({draggable: true});
  }

  onMarkerMouseDown(childKey, childProps, mouse) {
    this.setState({draggable: false});
  }

  onBoundsChange(center, zoom, bounds, marginBounds) {
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
        if (!this.state.googleApiLoaded || this.state.bounds.length == 0)
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

  render() {
    const listPoints = this.state.markers.map((marker, index) =>
        <div
           key={index}
           className="place"
           lat={marker.lat}
           lng={marker.lng}>
             {index + 1}
        </div>
    );
    const destination = {lat: this.state.center.lat + 1, lng: this.state.center.lng + 1};
    const ref = this.props.ref || DEFAULT_REF;
    const height =  DEFAULT_HEIGHT;

    return (
      <div className="Google-map" id={this.props.id} ref={ref}>
       <GoogleMap
        draggable={this.state.draggable}
        onChange={this.onChange}
        center={this.state.center}
        zoom={this.state.zoom}
        onChildMouseDown={::this.onMarkerMouseDown}
        onChildMouseUp={::this.onMarkerMouseUp}
        onChildMouseMove={::this.onMarkerMouseMove}
        onGoogleApiLoaded={::this.onGoogleApiLoaded}
        onBoundsChange={::this.onBoundsChange}
        yesIWantToUseGoogleMapApiInternals
        options={this.state.options}
        >
        {listPoints}
        {this.state.coordinates.coords.length ? this.drawSvg(ref) : null}
      </GoogleMap>
    </div>
    );
  }
}

export default SimpleMap;
