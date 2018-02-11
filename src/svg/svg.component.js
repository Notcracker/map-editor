import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Polyline from '../polyline/polyline.component';
import toPoints from './../functions/toPoints';

export default class Svg extends Component {
  static propTypes = {
    coordinates: PropTypes.object.isRequired,
    bounds: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { coords } = this.props.coordinates;
    if (coords.length === 0) {
      return null;
    }

    const ptCorner = toPoints(this.props.bounds[0], this.props.bounds[1], this.props.zoom);
    const { props } = this;

    function drawChildCoords(coordinates, index) {
      const { hasOwnProperty } = Object.prototype;
      if (hasOwnProperty.call(coordinates[0], 'lat') && hasOwnProperty.call(coordinates[0], 'lng')) {
        return (
          <Polyline
            key={index}
            coords={coordinates}
            ptCorner={ptCorner}
            zoom={props.zoom}
            options={props.coordinates.options}
          />
        );
      }
      return [];
    }

    return (
      <svg
        height={this.props.height}
        width={this.props.width}
      >
        {drawChildCoords(coords)}
      </svg>
    );
  }
}
