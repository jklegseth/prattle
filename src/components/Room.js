import React, { Component } from 'react';
import Firebase from './../modules/Firebase';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      rooms: [],
      newRoomName: '',
      hasError: false,
      showForm: false
    });

    this.roomsRef = Firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = Object.assign(snapshot.val(), { key: snapshot.key });
      this.setState({
        rooms: this.state.rooms.concat(room)
      });
    });
  }

  componentWillUnmount() {
    this.roomsRef.off();
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
    this.hideAddForm();
  }

  showAddForm = (e) => {
    this.setState({
      showForm: true
    });
  }

  hideAddForm = (e) => {
    e && e.preventDefault();
    this.setState({
      showForm: false
    });


  }

  render() {
    return (
      <div className="room-list">
        <div className="room-list-title-bar">
          <span className="mdl-layout-title">Rooms</span>
          <button
            className={"mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab room-list-add-toggle" + (this.state.showForm ? ' hidden' : '')}
            onClick={this.showAddForm}
            title="Add room"
            >
            <i className="material-icons">add</i>
          </button>
        </div>
        <form
          className={"room-list-add-form" + (this.state.showForm ? '' : ' hidden')}
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
            onClick={this.hideAddForm}
            >
            Cancel
          </button>
        </form>
        <nav className={"mdl-navigation" + (this.state.showForm ? ' hidden' : '')}>
          {
            this.state.rooms.map(room =>
              <a
                key={room.key}
                onClick={() => this.props.setActiveRoom(room.key)}
                className={'mdl-navigation__link' + (this.props.activeRoom === room.key ? ' active' : '')}
              >
                {room.name}
              </a>
            )
          }
        </nav>
      </div>
    )
  }

};

export default Room;
