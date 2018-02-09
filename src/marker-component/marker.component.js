import React, { Component } from 'react';
import './marker.component.css';

class Marker extends Component {

  state = {
    address: '',
    show: false
  };

  getLocation() {
    let geocoder = new this.props.maps.Geocoder();

    geocoder.geocode({'location': {lat: this.props.marker.lat, lng: this.props.marker.lng}}, (results, status) => {

      let address = '';

      switch(status) {
        case 'OK':
          if(results[1]) {
            address = results[0].formatted_address
          } else {
            address = 'unwknown place';
          }
          break;
        default:
          address = 'Geocoder failed due to: ' + status;
          break;
        }

        this.setState({
          address,
          show: true
        });
    })

  }

  onClick() {
    if (!this.props.moved) {
      this.getLocation();
    }
  }

  onClose() {
    console.log('close')
    this.setState({
      show: false
    });
  }

  render() {
    const { marker, index } = this.props;
    return (
        <div
          onClick={!this.state.show ? ::this.onClick : null}
          className={this.state.show ? "Popup" : "Marker"}
          >
          {
            this.state.show
            ?
            <div className="Popup-content">
              <div className="Popup-header">
                <div className="Popup-number">{index + 1}</div>
                <div className="Popup-name">{marker.name}</div>
                <div
                  className="Close-button"
                  onClick={::this.onClose}
                  >&times;</div>
              </div>
              <div className="Popup-address">{this.state.address}</div>
            </div>
            :
            index + 1
          }
          {
            this.state.show
            ?
            <div className="Arrow-down"></div>
            :
            null
          }
        </div>
    );
  }
}

export default Marker;
