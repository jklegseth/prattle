import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import Room from './components/Room';
import Message from './components/Message';
import User from './components/User';

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
      activeRoom: null,
      user: null
    });
  }

  setUser(user) {
    this.setState({
      user: user
    });
  }

  setActiveRoom(roomId) {
    this.setState({
      activeRoom: roomId,
      user: false
    });
  }

  render() {
    return (
      <div className="App">
        <User
          firebase={firebase}
          setUser={(isLoggedIn) => this.setUser(isLoggedIn)}
          user={this.state.user}
        ></User>
        <Room
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={(roomId) => this.setActiveRoom(roomId)}
        ></Room>
        <Message
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          user={this.state.user}
        ></Message>

      </div>
    );
  }
}

export default App;
