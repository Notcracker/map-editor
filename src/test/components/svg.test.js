import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';

import Svg from '../../svg/svg.component';


describe('<Svg />', () => {

  it('should init Svg', () => {
    const wrapper = mount(<Svg
        bounds={[
          59.99123325281002,
          30.20600806250002,
          59.919553987096606,
          30.35106192602541,
          59.919553987096606,
          30.20600806250002,
          59.99123325281002,
          30.35106192602541,
        ]}
        coordinates={{coords: [
          {lat:59.955928674091496,lng:30.303168401855487},
          {lat:59.95541299999999,lng: 30.33784399999999}],
          options:{ fillOpacity: "0", stroke: "#222", strokeOpacity: "0.8", strokeWidth:1}}}
        zoom={13}
       />);

    assert.equal(wrapper.find('svg').length, 1);
  });
});
