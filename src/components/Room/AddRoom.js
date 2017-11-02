import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Firebase from './../../modules/Firebase';
import TextField from 'material-ui/TextField';
import {RaisedButton, FlatButton} from 'material-ui';

class AddRoom extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      newRoomName: '',
      hasError: false
    });

    this.roomsRef = Firebase.database().ref('rooms');
  }

  updateRoomName(e) {
    const roomName = e.target.value;
    const hasError = !!roomName ? false : this.state.hasError;

    this.setState({
      newRoomName: roomName,
      hasError: hasError
    });
  }

  createRoom(e) {
    if ((e.type === 'keydown' && e.which !== 13)) return true;
    e.preventDefault();

    const roomName = this.state.newRoomName;
    let pushedRef;

    if (!roomName) {
      return this.setState({
        hasError: true
      });
    }
    pushedRef = this.roomsRef.push({
      name: roomName
    });
    this.setState({
      newRoomName: '',
      hasError: false
    });
    this.props.setActiveRoom(pushedRef.getKey());
    this.props.hideForm();
  }

  render() {
    return (
      <form
        className="room-list-add-form"
        onSubmit={this.createRoom.bind(this)}
        onKeyDown={this.createRoom.bind(this)}
      >
        {this.props.formVisible ?
          <div>
            <TextField
              floatingLabelText="Enter room name..."
              value={this.state.newRoomName}
              onChange={this.updateRoomName.bind(this)}
              id="addRoomForm"
              fullWidth={true}
           />
            <RaisedButton label="Create" primary={true} fullWidth={true} />
            <FlatButton label="Cancel" onClick={this.props.hideForm} fullWidth={true} />
          </div>
        : null }
      </form>
    )
  }
};

AddRoom.propTypes = {
  formVisible: PropTypes.bool.isRequired,
  hideForm: PropTypes.func.isRequired,
  setActiveRoom: PropTypes.func.isRequired
}

export default AddRoom;
