import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/sidebar.component.js';
import SimpleMap from './map-area/map-area.component.js';

class App extends Component {
  state = {
    markers: [1,2,3,4,5]
  };

  handleSidebarCreateCallback(pointName) {
    this.setState({
      markers: [...this.state.markers, pointName],
    })
  }

  handleSidebarRemoveCallback(pointIndex) {
    this.setState({
      markers: [
        ...this.state.markers.slice(0, pointIndex),
        ...this.state.markers.slice(pointIndex + 1)
      ],
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
            markers={this.state.markers}
            parentOnCreatePoint={::this.handleSidebarCreateCallback}
            parentOnRemovePoint={::this.handleSidebarRemoveCallback}
          ></Sidebar>
          <SimpleMap
            markers={this.state.markers}
          />
        </div>
      </div>
    );
  }
}

export default App;
