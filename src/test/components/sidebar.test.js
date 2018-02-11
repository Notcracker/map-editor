import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';

import Sidebar from '../../sidebar/sidebar.component';


describe('<Sidebar />', () => {

  it('should init Sidebar', () => {
    const wrapper = mount(<Sidebar
      parentOnCreatePoint={() => {}}
      parentOnChangePoint={() => {}}
      parentOnRemovePoint={() => {}}
       />);

    assert.equal(wrapper.find('.Sidebar').length, 1);
  });

  it('should create and remove point', () => {
    const wrapper = mount(<Sidebar
      parentOnCreatePoint={() => {}}
      parentOnChangePoint={() => {}}
      parentOnRemovePoint={() => {}}
      />);

      wrapper.instance().createPoint('testPoint');
      assert.equal(wrapper.instance().state.markers.length, 1);
      wrapper.instance().onRemovePointPressed(0);
      assert.equal(wrapper.instance().state.markers.length, 0);
  });

  it('should change point\'s position', () => {
    const wrapper = mount(<Sidebar
      parentOnCreatePoint={() => {}}
      parentOnChangePoint={() => {}}
      parentOnRemovePoint={() => {}}
      />);

      wrapper.instance().createPoint('firstPoint');
      wrapper.instance().createPoint('secondPoint');
      assert.equal(wrapper.instance().state.markers.length, 2);
      wrapper.instance().onListChange([
        {marker: 'secondPoint'},
        {marker: 'firstPoint'}
      ], 
      'firstPoint', 0, 1);
      assert.equal(wrapper.instance().state.markers[0], 'secondPoint');
      assert.equal(wrapper.instance().state.markers[1], 'firstPoint');
  });
});
