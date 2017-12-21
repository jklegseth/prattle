import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddMessage from './AddMessage';
import MessageItem from './MessageItem';
import List from 'material-ui/List';
import Firebase from './../../modules/Firebase';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      messages: []
    });

    this.messagesRef = Firebase.database().ref('messages');
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    return (
      <div>
        <div className="message-list" ref={(div) => { this.messageList = div; }}>
          <List>
            {
              this.state.messages.map((message, index) =>
                <MessageItem
                  key={index}
                  index={index}
                  message={message}
                  user={this.props.user}
                />
              )
            }
          </List>
        </div>
        { this.props.activeRoom &&
          <AddMessage
            activeRoom={this.props.activeRoom}
            scrollToBottom={() => this.scrollToBottom}
            user={this.props.user}
          ></AddMessage>
        }
      </div>
    )
  }
};

Message.propTypes = {
  activeRoom: PropTypes.string,
  user: PropTypes.object
}

export default Message;
