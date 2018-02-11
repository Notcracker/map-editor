import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';

import Marker from '../../marker/marker.component';


describe('<Marker />', () => {

  it('should init Marker', () => {
    const wrapper = mount(<Marker
      index={0}
      marker={{name: 'testName'}}
      lat={60}
      lng={30}
      moved={false}
      maps={null}
       />);

    assert.equal(wrapper.find('.Marker').length, 1);
  });
});
