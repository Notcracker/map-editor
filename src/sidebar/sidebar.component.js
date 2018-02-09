import React, { Component } from 'react';
import DraggableList from  'react-draggable-list';
import './sidebar.component.css';

class Sidebar extends Component {

  state = {
    markers: [],
    useContainer: true,
  };

  createPoint(pointName) {
    this.setState({
      markers: [...this.state.markers, pointName],
    });
    this.props.parentOnCreatePoint(pointName);
  }

  onKeyPressed(eve) {
    if (eve.key === "Enter" && eve.target.value.length) {
      this.createPoint(eve.target.value);
      this.newPointInput.value = '';
    }
  }

  onRemovePointPressed(index) {
    this.setState({
      markers: [
        ...this.state.markers.slice(0, index),
        ...this.state.markers.slice(index + 1)
      ],
    });
    this.props.parentOnRemovePoint(index);
  }

  onListChange(newList, movedItem, oldIndex, newIndex) {
    let markers = newList.map(item => {
      return item.marker;
    });
   this.setState({ markers });

    this.props.parentOnChangePoint(oldIndex, newIndex);
  }

  render() {
    const markers = this.state.markers.map((marker, index) => {
        return {marker, index};
    });

    return (
      <div className="Sidebar">
        <input
          type="text"
          name="pointInput"
          className="Point-input"
          placeholder="Enter point name:"
          onKeyDown={::this.onKeyPressed}
          ref={el => this.newPointInput = el}
           />
         <div className="List-wrapper" ref={ref => this._container = ref}>
           <ul className="Points-list">
             <DraggableList
               itemKey="marker"
               template={PointItem}
               list={markers}
               container={()=>this.state.useContainer ? this._container : document.body}
               onMoveEnd={::this.onListChange}
               commonProps={{deleteCallback: ::this.onRemovePointPressed}}
            />
          </ul>
       </div>
      </div>
    );
  }
}

class PointItem extends Component {
  render() {
    const dragHandle = this.props.dragHandle;
    return (
      <li>
        {dragHandle(
          <div className="Points-list-item">
          <div className="Point-number">{this.props.item.index + 1}</div>
          <div className="Point-name">{this.props.item.marker}</div>
          <div
            className="Delete-button"
            onClick={() => this.props.commonProps.deleteCallback(this.props.item.index)}
            >&times;</div>
        </div>)}
      </li>
    );
  }
}

export default Sidebar;
