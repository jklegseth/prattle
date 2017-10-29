import React, { Component } from 'react';
import Firebase from './../modules/Firebase';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      messages: [],
      activeRoom: this.props.activeRoom,
      messageText: '',
      hasError: false,
      messageError: ''
    });

    this.messagesRef = Firebase.database().ref('messages');
    console.log(Firebase);
  }

  listMessages = (snapshot) => {
    if (snapshot.val()) {
      this.setState({
        messages: this.state.messages.concat(snapshot.val())
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const roomId = nextProps.activeRoom;

    this.setState({
      messages: []
    });

    // when we switch rooms we want to remove the old listener and start listening on new room
    this.messagesRef.orderByChild('roomId').equalTo(roomId).off();
    this.messagesRef.orderByChild('roomId').equalTo(roomId).on('child_added', this.listMessages);
  }

  setMessage(e) {
    this.setState({
      messageText: e.target.value
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const messageText = this.state.messageText;

    if (!messageText) {
      return this.setState({
        hasError: true,
        messageError: 'Please enter a prattle'
      });
    }
    this.messagesRef.push({
      submittedAt: Firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user.displayName,
      content: messageText,
      roomId: this.props.activeRoom
    });
    this.setState({
      messageText: '',
      hasError: false,
      messageError: ''
    });
  }

  render() {
    return (
      <div className="message-list">
        {
          this.state.messages.map((message, index) =>
            <li key={index} className="message-list-item">
              {message.content}<br />
              {message.submittedAt}<br />
              {message.username}<br />
            </li>
          )
        }

        <div className="message-send">
          <form onSubmit={this.sendMessage.bind(this)}>
            <input type="text" value={this.state.messageText} onChange={this.setMessage.bind(this)} placeholder="Prattle away..." />
            <button type="submit">Prattle!</button>
            <span className={this.state.hasError ? 'form-error' : ''}>{this.state.messageError}</span>
          </form>
        </div>
      </div>
    )
  }
};

export default Message;
