import React, { Component } from 'react';
import './App.css';
import Room from './components/Room';
import Message from './components/Message';
import User from './components/User';

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBpGsPJcfsHiSKgI-JTKHsWfLF7ql8XcpI",
//   authDomain: "prattle-bde0b.firebaseapp.com",
//   databaseURL: "https://prattle-bde0b.firebaseio.com",
//   projectId: "prattle-bde0b",
//   storageBucket: "prattle-bde0b.appspot.com",
//   messagingSenderId: "891177641423"
// };
// firebase.initializeApp(config);


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
    if (roomId === this.state.activeRoom) return;
    this.setState({
      activeRoom: roomId
    });
  }

  render() {
    return (
      <div className={'App' + (this.state.user ? ' logged-in' : ' logged-out')}>
        <User
          setUser={(isLoggedIn) => this.setUser(isLoggedIn)}
          user={this.state.user}
        ></User>
      <div className="chatroom-container">
          <Room

            activeRoom={this.state.activeRoom}
            setActiveRoom={(roomId) => this.setActiveRoom(roomId)}
          ></Room>
          <Message

            activeRoom={this.state.activeRoom}
            user={this.state.user}
          ></Message>
        </div>
      </div>
    );
  }
}

export default App;
