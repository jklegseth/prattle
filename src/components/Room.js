import React, { Component } from 'react';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      rooms: []
    });

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    console.log(this.roomsRef);
    this.roomsRef.on('child_added', snapshot => {
      const room = Object.assign(snapshot.val(), { key: snapshot.key });
      this.setState({
        rooms: this.state.rooms.concat(room)
      });
    });
  }

  render() {
    return (
      <div className="room-list">
        {
          this.state.rooms.map(room =>
            <li key={room.key}>
              {room.name}
            </li>
          )
        }

      </div>
    )
  }

};

export default Room;
