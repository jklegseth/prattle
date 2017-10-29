import React, { Component } from 'react';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      rooms: [],
      newRoomName: '',
      hasError: false,
      newRoomError: ''
    });

    this.roomsRef = this.props.firebase.database().ref('rooms');
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
    const newRoomError = !!roomName ? '' : this.state.newRoomError;

    this.setState({
      newRoomName: roomName,
      hasError: hasError,
      newRoomError: newRoomError
    });
  }

  createRoom(e) {
    e.preventDefault();
    const roomName = this.state.newRoomName;
    let pushedRef;

    if (!roomName) {
      return this.setState({
        hasError: true,
        newRoomError: 'Please enter a name'
      });
    }
    pushedRef = this.roomsRef.push({
      name: roomName
    });
    this.setState({
      newRoomName: '',
      hasError: false,
      newRoomError: ''
    });

    this.props.setActiveRoom(pushedRef.getKey());
  }

  render() {
    return (
      <div className="room-list">
        <form>
          <input
            type="text"
            value={this.state.newRoomName}
            onChange={this.updateRoomName.bind(this)}
            placeholder="Enter new room name"
          />
          <button onClick={this.createRoom.bind(this)}>Add Room</button>
          <span className={this.state.hasError ? 'form-error' : ''}>{this.state.newRoomError}</span>
        </form>
        {
          this.state.rooms.map(room =>
            <li
              key={room.key}
              onClick={() => this.props.setActiveRoom(room.key)}
              className={'room-list-item' + (this.props.activeRoom === room.key ? ' active' : '')}
            >
              {room.name}
            </li>
          )
        }
      </div>
    )
  }

};

export default Room;
