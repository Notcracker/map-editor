import React, { Component } from 'react';
import './map-area.component.css';

import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {

  state = {
    center: {lat: 59.955413, lng: 30.337844},
    zoom: 13,
    draggable: true,
    lat: 59.955413,
    lng: 30.337844,
    markers: []
  };

  constructor(props) {
    super(props);
    const markers = this.onFilterMarkers(props);
    this.state.markers = markers;
  }

  componentWillReceiveProps(nextProps) {
    const markers = this.onFilterMarkers(nextProps);
    this.setState({ markers });
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

  onChange = ({center, zoom}) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  }

  onFilterMarkers(props) {
    return props.markers.map((marker) => {
      return {name: marker, lat: this.state.lat, lng: this.state.lng}
    });
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
