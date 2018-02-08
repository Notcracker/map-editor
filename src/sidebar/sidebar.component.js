import React, { Component } from 'react';
import './sidebar.component.css';

class Sidebar extends Component {

  state = {
    markers: []
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

  render() {
    const listPoints = this.state.markers.map((marker, index) =>
        <li key={index} className="Points-list-item">
          <div className="Point-number">{index + 1}</div>
          <div className="Point-name">{marker}</div>
          <div
            className="Delete-button"
            onClick={() => ::this.onRemovePointPressed(index)}
            >&times;</div>
        </li>
    );
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
         <div className="List-wrapper">
           <ul className="Points-list">
             {listPoints}
           </ul>
       </div>
      </div>
    );
  }
}

export default Sidebar;
