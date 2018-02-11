import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';

import Polyline from '../../polyline/polyline.component';


describe('<Polyline />', () => {

  it('should init Polyline', () => {
    const wrapper = mount(<Polyline
      coords={[{lat: 59.955928674091496, lng: 30.303168401855487}, {lat: 59.95541299999999, lng: 30.33784399999999}]}
      zoom={13}
      ptCorner={{x: 1224538.7506119113, y: 609114.3141059761}}
      options={{fillOpacity: "0", stroke: "#222", strokeOpacity: "0.8", strokeWidth: 1}}
      />);

    assert.equal(wrapper.find('polyline').length, 1);
  });
});
