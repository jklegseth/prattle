import React, { Component } from 'react';
import Firebase from './../modules/Firebase';

class User extends Component {
  componentWillMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
      } else {
        this.props.setUser(null);
      }
    });
  }

  login() {
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  }

  logout() {
    Firebase.auth().signOut();
  }

  render() {
    return (
      <div className="user">
        {this.props.user ? (
          <button className="mdl-button mdl-js-button" onClick={this.logout.bind(this)}>Sign Out</button>
        ) : (
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
            onClick={this.login.bind(this)}
          >Sign In</button>
        )}
      </div>
    );
  }
}

export default User;
