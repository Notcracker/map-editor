import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Polyline from '../polyline/polyline.component';
import toPoints from './../functions/toPoints';

export default class Svg extends Component {
    static propTypes = {
        coordinates: PropTypes.object,
        bounds: PropTypes.array,
        zoom: PropTypes.number
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const coords = this.props.coordinates.coords;
        if (coords.length === 0)
            return null;

        const ptCorner = toPoints(this.props.bounds[0], this.props.bounds[1], this.props.zoom);
        const props = this.props;

        function drawChildCoords(coords, index) {
            if (coords[0].hasOwnProperty('lat') && coords[0].hasOwnProperty('lng')) {
              return <Polyline
                  key={index}
                  coords={coords}
                  ptCorner={ptCorner}
                  zoom={props.zoom}
                  options={props.coordinates.options} />;
            }

            let child = [];
            return child;
        }

        return (
            <svg
                height={this.props.height}
                width={this.props.width}>
                {drawChildCoords(coords)}
            </svg>
        );
    }
}
