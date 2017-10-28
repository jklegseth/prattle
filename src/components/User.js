import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
      } else {
        this.props.setUser(null);
      }
    });
  }

  login() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  logout() {
    this.props.firebase.auth().signOut();
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
