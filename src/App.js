import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import Room from './components/Room';

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
  render() {
    return (
      <div className="App">
        <Room firebase={firebase}></Room>

      </div>
    );
  }
}

export default App;
