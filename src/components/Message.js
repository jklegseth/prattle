import React, { Component } from 'react';
import Firebase from './../modules/Firebase';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      messages: [],
      hasError: false
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

  convertTimestamp(ts) {
    const date = new Date(ts);
    const hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    const dayMonth = date.toDateString();
    let formattedDate;
    minutes = minutes.substr(-2);

    formattedDate = dayMonth.slice(0, -5);
    formattedDate += hours > 12 ? ` ${hours % 12}:${minutes} PM` : ` ${hours}:${minutes} AM`;

    return formattedDate;
  }

  sendMessage(e) {
    if ((e.shiftKey || (e.type === 'keydown' && e.which !== 13))) return true;
    e.preventDefault();
    const message = e.target.value;

    if (!message) {
      return this.setState({
        hasError: true
      });
    }

    this.messagesRef.push({
      submittedAt: Firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user.displayName,
      content: message,
      roomId: this.props.activeRoom
    });
    this.setState({
      hasError: false
    });
    e.target.value = '';
    this.scrollToBottom();
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

  splitNewlines(message) {
    return message.split('\n').map((line, index) => {
      return (
        <span key={index}>
          {line}
          <br />
        </span>
      )
    });
  }

  render() {
    return (
      <div>
        <div className="message-list" ref={(div) => { this.messageList = div; }}>
          <ul className="mdl-list">
            {
              this.state.messages.map((message, index) =>
                <li key={index} className="mdl-list__item mdl-list__item--three-line">
                  <span className="mdl-list__item-primary-content">
                    <i className="message-list-avatar mdl-list__item-avatar material-icons">megaphone</i>
                    <span>
                      {message.username}
                      <span className="message-item-date">{this.convertTimestamp(message.submittedAt)}</span>
                    </span>
                    <span className="mdl-list__item-text-body">
                      { this.splitNewlines(message.content) }
                    </span>
                  </span>
                </li>
              )
            }
          </ul>
        </div>

        <div className={"message-send" + (this.props.activeRoom ? '' : ' hidden')}>
          <form>
            <div className={"message-send-txt mdl-textfield mdl-js-textfield mdl-textfield--floating-label" + (this.state.hasError ? ' is-invalid' : '')}>
              <textarea
                rows= "3"
                className="mdl-textfield__input"
                type="text"
                id="prattle"
                onKeyDown={this.sendMessage.bind(this)}
              />
            <label className="mdl-textfield__label" htmlFor="prattle">Your prattle...</label>
            </div>
          </form>
        </div>

      </div>
    )
  }
};

export default Message;
