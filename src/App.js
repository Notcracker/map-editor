import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/sidebar.component.js';
import MapArea from './map-area/map-area.component.js';

class App extends Component {
  state = {
    markers: [],
    action: {}
  };

  handleSidebarCreateCallback(pointName) {
    this.setState({
      marker: { name: pointName },
      action: { name: 'add' }
    })
  }

  handleSidebarRemoveCallback(pointIndex) {
    this.setState({
      action: { name: 'remove', oldIndex: pointIndex }
    })
  }

  handleSidebarChangeCallback(oldIndex, newIndex) {
    this.setState({
      action: { name: 'change', oldIndex, newIndex }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Main-content">
          <Sidebar
            parentOnCreatePoint={this.handleSidebarCreateCallback.bind(this)}
            parentOnChangePoint={this.handleSidebarChangeCallback.bind(this)}
            parentOnRemovePoint={this.handleSidebarRemoveCallback.bind(this)}
          ></Sidebar>
          <MapArea
            action={this.state.action}
            marker={this.state.marker}
          />
        </div>
      </div>
    );
  }
}

export default App;
