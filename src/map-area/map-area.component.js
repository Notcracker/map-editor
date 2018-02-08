import React, { Component } from 'react';
import './map-area.component.css';

import  GoogleMap  from 'google-map-react';
import Svg  from '../svg-component/svg.component';

const DEFAULT_REF = 'map';
const DEFAULT_HEIGHT = '400px';

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
         [
             {lat: 25.774, lng: -80.190},
             {lat: 18.466, lng: -66.118},
             {lat: 32.321, lng: -64.757},
             {lat: 25.774, lng: -80.190}
         ],
         [
             {lat: 25.774, lng: -60.190},
             {lat: 18.466, lng: -46.118},
             {lat: 32.321, lng: -44.757},
             {lat: 25.774, lng: -60.190}
         ],
     ],
     options: {
        strokeWidth: 1,
        stroke: '#FF5106',
        strokeOpacity: '0.8',
        fill: '#FF4234',
        fillOpacity: '0.3',
        onMouseEnter: function(e) {
        },
        onMouseLeave: function(e) {
          }
        },
      },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.action.name === 'add') {
      this.setState({
        markers: [...this.state.markers, {
          name: nextProps.marker.name,
          lat: this.state.center.lat,
          lng: this.state.center.lng,
        }]
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

    markers[childKey].lat = mouse.lat;
    markers[childKey].lng = mouse.lng;
    this.setState({ markers });
  }

  onMarkerMouseUp(childKey, childProps, mouse) {
    this.setState({draggable: true});
  }

  onMarkerMouseDown(childKey, childProps, mouse) {
    this.setState({draggable: false});
  }

  onGoogleApiLoaded({map, maps}) {
    this.setState({
            googleApiLoaded: true
        });

        const bounds = new maps.LatLngBounds();

        function extendBounds(lat, lng) {
            const latLng = new maps.LatLng(lat, lng);
            bounds.extend(latLng);
        }
        function extendCoordsBounds(coords) {
            for (var i = 0; i < coords.length; i++) {
                if (coords[i].hasOwnProperty('lat') && coords[i].hasOwnProperty('lng')) {
                    extendBounds(coords[i].lat, coords[i].lng);
                } else if (Array.isArray(coords[i])) {
                    extendCoordsBounds(coords[i]);
                }
            }
        }

        extendCoordsBounds(this.state.coordinates.coords);

        map.fitBounds(bounds);
  }

  onBoundsChange(center, zoom, bounds, marginBounds) {
        this.setState({
            zoom: zoom,
            bounds: bounds,
            center: center
        });
    }


  onChange = ({center, zoom}) => {
    this.setState({
      center,
      zoom,
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
    const height = this.state.height || DEFAULT_HEIGHT;

    return (
      <div className="Google-map" style={{height: height}} id={this.props.id} ref={ref}>
       <GoogleMap
        draggable={this.state.draggable}
        onChange={this.onChange}
        center={this.state.center}
        zoom={this.state.zoom}
        defaultZoom={this.props.zoom}
        onChildMouseDown={::this.onMarkerMouseDown}
        onChildMouseUp={::this.onMarkerMouseUp}
        onChildMouseMove={::this.onMarkerMouseMove}
        onGoogleApiLoaded={::this.onGoogleApiLoaded}
        onBoundsChange={::this.onBoundsChange}
        yesIWantToUseGoogleMapApiInternals
        options={this.state.options}
        >
        {listPoints}
        {this.drawSvg(ref)}
      </GoogleMap>
    </div>
    );
  }
}

export default SimpleMap;
