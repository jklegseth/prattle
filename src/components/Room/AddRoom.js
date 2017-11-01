import React, { Component } from 'react';
import Firebase from './../../modules/Firebase';

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
        className={"room-list-add-form" + (this.props.formVisible ? '' : ' hidden')}
        onSubmit={this.createRoom.bind(this)}
        onKeyDown={this.createRoom.bind(this)}
      >
        <div className="mdl-textfield mdl-js-textfield">
          <div className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label" + (this.state.hasError ? ' is-invalid' : '')}>
            <input
              className="room-list-add-txt mdl-textfield__input"
              type="text"
              id="roomName"
              value={this.state.newRoomName}
              onChange={this.updateRoomName.bind(this)}
              pattern="[A-Z,a-z]*"
              />
            <label className="mdl-textfield__label" htmlFor="roomName">Enter room name...</label>
          </div>
        </div>
        <button type="submit" className="room-list-add-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
          Create
        </button>
        <button
          className="room-list-add-cancel mdl-button mdl-js-button mdl-js-ripple-effect"
          onClick={this.props.hideAddForm}
          >
          Cancel
        </button>
      </form>
    )
  }
};

export default AddRoom;
