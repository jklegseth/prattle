import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      messages: [],
      activeRoom: this.props.activeRoom
    });

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentWillReceiveProps(nextProps) {
    const roomId = nextProps.activeRoom;

    this.setState({
      messages: []
    });

    this.messagesRef.orderByChild('roomId').equalTo(roomId).on('child_added', snapshot => {
      this.setState({
        messages: this.state.messages.concat(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div className="message-list">
        {
          this.state.messages.map((message, index) =>
            <li
              key={index}
              className="message-list-item"
            >
              {message.content}
            </li>
          )
        }
      </div>
    )
  }

};

export default Message;
