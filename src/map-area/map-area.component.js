import React, { Component } from 'react';
import './map-area.component.css';

import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {

  state = {
    center: {lat: 59.955413, lng: 30.337844},
    zoom: 13,
    draggable: true,
    lat: 59.955413,
    lng: 30.337844
  };

  onAddMarker() {
    console.log('marker added');
  }

  onMarkerMouseMove(childKey, childProps, mouse) {
    this.setState({
      draggable: !this.state.draggable,
      lat: mouse.lat,
      lng: mouse.lng
    });
  }

  onMarkerMouseUp(childKey, childProps, mouse) {
    this.setState({draggable: true});
  }

  onMarkerMouseDown(childKey, childProps, mouse) {
    console.log(childKey);
    this.setState({draggable: false});
  }

  onChange = ({center, zoom}) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  }

  render() {
    const listPoints = this.props.markers.map((marker, index) =>
        <div
           key={index}
           className="place"
           lat={this.state.lat + +marker}
           lng={this.state.lng + +marker}>
             {marker}
        </div>
    );
    return (
      <div className="Google-map">
       <GoogleMapReact
        draggable={this.state.draggable}
        onChange={this.onChange}
        center={this.state.center}
        zoom={this.state.zoom}
        defaultZoom={this.props.zoom}
        onChildMouseDown={::this.onMarkerMouseDown}
        onChildMouseUp={::this.onMarkerMouseUp}
        onChildMouseMove={::this.onMarkerMouseMove}
        >
        {listPoints}
      </GoogleMapReact>
    </div>
    );
  }
}

export default SimpleMap;
