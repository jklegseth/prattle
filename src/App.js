import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import Room from './components/Room';
import Message from './components/Message';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBpGsPJcfsHiSKgI-JTKHsWfLF7ql8XcpI",
  authDomain: "prattle-bde0b.firebaseapp.com",
  databaseURL: "https://prattle-bde0b.firebaseio.com",
  projectId: "prattle-bde0b",
  storageBucket: "prattle-bde0b.appspot.com",
  messagingSenderId: "891177641423"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      activeRoom: null
    });
  }

  setActiveRoom(roomId) {
    console.log('active', roomId);
    this.setState({
      activeRoom: roomId
    });
  }

  render() {
    return (
      <div className="App">
        <Room
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={(roomId) => this.setActiveRoom(roomId)}
        ></Room>
        <Message
          firebase={firebase}
          activeRoom={this.state.activeRoom}
        ></Message>

      </div>
    );
  }
}

export default App;
