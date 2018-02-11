import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';

import MapArea from '../../map-area/map-area.component';


describe('<MapArea />', () => {

  it('should init MapArea', () => {
    const wrapper = mount(<MapArea />);

    assert.equal(wrapper.find('.Google-map').length, 1);
  });

  it('should create and remove point', () => {
    const wrapper = mount(<MapArea />);

      wrapper.instance().componentWillReceiveProps({
        marker: { name: 'testPoint' },
        action: { name: 'add' }
      });

      assert.equal(wrapper.instance().state.markers.length, 1);

      wrapper.instance().componentWillReceiveProps({
        action: { name: 'remove', oldIndex: 0 }
      });
      assert.equal(wrapper.instance().state.markers.length, 0);
  });

  it('should change point\'s position', () => {
    const wrapper = mount(<MapArea />);

      wrapper.instance().componentWillReceiveProps({
        marker: { name: 'firstPoint' },
        action: { name: 'add' }
      });

      wrapper.instance().componentWillReceiveProps({
        marker: { name: 'secondPoint' },
        action: { name: 'add' }
      });

      assert.equal(wrapper.instance().state.markers.length, 2);

      wrapper.instance().componentWillReceiveProps({
        action: { name: 'change', oldIndex: 0, newIndex: 1 }
      });

      assert.equal(wrapper.instance().state.markers[0].name, 'secondPoint');
      assert.equal(wrapper.instance().state.markers[1].name, 'firstPoint');
  });

  it('should lock and unlock on markers interactions', () => {
    const wrapper = mount(<MapArea />);

    wrapper.instance().componentWillReceiveProps({
      marker: { name: 'testPoint' },
      action: { name: 'add' }
    });

    wrapper.instance().onMarkerMouseDown();
    wrapper.instance().onMarkerMouseMove(0, null, {lat: 20, lng: 30});
    assert.equal(wrapper.instance().state.draggable, false);
    assert.equal(wrapper.instance().state.moved, true);

    wrapper.instance().onMarkerMouseUp();
    assert.equal(wrapper.instance().state.draggable, true);
    assert.equal(wrapper.instance().state.moved, true);

    wrapper.instance().onMarkerMouseDown();
    assert.equal(wrapper.instance().state.moved, false);

    wrapper.instance().onMarkerMouseUp();
    assert.equal(wrapper.instance().state.moved, false);
  });
});
