import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddRoom from './AddRoom';
import Firebase from './../../modules/Firebase';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
          <span className="room-list-hdr">Rooms</span>
            <FloatingActionButton
              mini={true}
              secondary={true}
              onClick={this.showForm}
              title="Add room"
              className="room-list-add-toggle"
            >
              <ContentAdd />
            </FloatingActionButton>

        </div>

        <AddRoom
          formVisible={this.state.formVisible}
          hideForm={(e) => this.hideForm(e)}
          setActiveRoom={(key) => this.props.setActiveRoom(key)}
        ></AddRoom>

        <nav>
          <Menu>
            {
              this.state.rooms.map(room =>
                <MenuItem
                  primaryText={room.name}
                  key={room.key}
                  onClick={() => this.props.setActiveRoom(room.key)}
                  className={this.props.activeRoom === room.key ? ' active' : ''}
                />
              )
            }
          </Menu>
        </nav>
      </div>
    )
  }

};

Room.propTypes = {
  activeRoom: PropTypes.string,
  setActiveRoom: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Room;
