import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DraggableList from 'react-draggable-list';
import './sidebar.component.css';

class PointItem extends Component {
  static propTypes = {
    dragHandle: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    commonProps: PropTypes.object,
  };

  render () {
    const { dragHandle, item, commonProps } = this.props;
    return (
      <li>
        {dragHandle(<div className="Points-list-item">
          <div className="Point-number">{item.index + 1}</div>
          <div className="Point-name">{item.marker}</div>
          <div
            className="Delete-button"
            onClick={() => commonProps.deleteCallback(item.index)}
          >&times;
          </div>
        </div>)}
      </li>
    );
  }
}

class Sidebar extends Component {
  static propTypes = {
    parentOnRemovePoint: PropTypes.func.isRequired,
    parentOnChangePoint: PropTypes.func.isRequired,
    parentOnCreatePoint: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onListChange = this.onListChange.bind(this);
    this.onRemovePointPressed = this.onRemovePointPressed.bind(this);
  }

  state = {
    markers: [],
    useContainer: true,
  };

  onKeyPressed(eve) {
    if (eve.key === 'Enter' && eve.target.value.length) {
      const found = this.state.markers.find((marker) => {
        if (marker === eve.target.value) return marker;
      });

      if (found) {
        alert('Sorry, this name is already in use. Choose another one.');
        return;
      }
      this.createPoint(eve.target.value);
      this.newPointInput.value = '';
    }
  }

  onRemovePointPressed(index) {
    this.setState({
      markers: [
        ...this.state.markers.slice(0, index),
        ...this.state.markers.slice(index + 1),
      ],
    });
    this.props.parentOnRemovePoint(index);
  }

  onListChange(newList, movedItem, oldIndex, newIndex) {
    const markers = newList.map(item => item.marker);
    this.setState({ markers });

    this.props.parentOnChangePoint(oldIndex, newIndex);
  }

  createPoint(pointName) {
    this.setState({
      markers: [...this.state.markers, pointName],
    });
    this.props.parentOnCreatePoint(pointName);
  }

  render() {
    const markers = this.state.markers.map((marker, index) => {
      return { marker, index }
    });

    return (
      <div className="Sidebar">
        <input
          type="text"
          name="pointInput"
          className="Point-input"
          placeholder="Enter point name:"
          onKeyDown={this.onKeyPressed}
          ref={el => this.newPointInput = el}
        />
         {
           markers.length
           ?
           <div className="List-wrapper" ref={ref => this.container = ref}>
             <ul className="Points-list">
               <DraggableList
                 itemKey="marker"
                 template={PointItem}
                 list={markers}
                 container={() => this.state.useContainer ? this.container : document.body}
                 onMoveEnd={this.onListChange}
                 commonProps={{ deleteCallback: this.onRemovePointPressed }}
                 />
             </ul>
           </div>
           :
           null
         }
      </div>
    );
  }
}

export default Sidebar;
