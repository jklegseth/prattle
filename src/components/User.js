import React, { Component } from 'react';
import Firebase from './../modules/Firebase';

class User extends Component {
  componentDidMount() {
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
        {this.props.user ? ''
          :
          (
            <div>
              <h1>Welcome to Prattle!</h1><p>Please sign in to start prattling...</p>
            </div>
          )
        }

        {this.props.user ? (
          <button onClick={this.logout.bind(this)}>Sign Out</button>
        ) : (
          <button onClick={this.login.bind(this)}>Sign In</button>
        )}
      </div>
    );
  }
}

export default User;
