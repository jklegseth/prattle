import React, { Component } from 'react';
import AddRoom from './AddRoom';
import Firebase from './../../modules/Firebase';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      rooms: [],
      formVisible: false
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

  showForm = (e) => {
    this.setState({
      formVisible: true
    });
  }

  hideForm = (e) => {
    e && e.preventDefault();
    this.setState({
      formVisible: false
    });
  }

  render() {
    return (
      <div className="room-list">
        <div className="room-list-title-bar">
          <span className="mdl-layout-title">Rooms</span>
          <button
            className={"mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab room-list-add-toggle" + (this.state.formVisible ? ' hidden' : '')}
            onClick={this.showForm}
            title="Add room"
            >
            <i className="material-icons">add</i>
          </button>
        </div>

        <AddRoom
          formVisible={this.state.formVisible}
          hideForm={(e) => this.hideForm(e)}
          setActiveRoom={(key) => this.props.setActiveRoom(key)}
        ></AddRoom>

      <nav className={"mdl-navigation" + (this.state.formVisible ? ' hidden' : '')}>
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
