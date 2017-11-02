import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Firebase from './../modules/Firebase';
import {RaisedButton, FlatButton} from 'material-ui';

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
          <FlatButton label="Sign Out" style={{color: 'rgba(255, 255, 255, .9)'}} onClick={this.logout.bind(this)} />
        ) : (
          <RaisedButton label="Sign In" secondary={true} onClick={this.login.bind(this)} />
        )}
      </div>
    );
  }
}

User.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default User;
