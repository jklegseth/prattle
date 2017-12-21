import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Firebase from './../../modules/Firebase';
import TextField from 'material-ui/TextField';

class AddMessage extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      hasError: false
    });

    this.messagesRef = Firebase.database().ref('messages');
  }

  sendMessage = (e) => {
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
    this.props.scrollToBottom();
  }

  render() {
    return (
      <div className="message-send">
        <form>
          <TextField
            hintText="Message Field"
            floatingLabelText="Your prattle..."
            multiLine={true}
            rows={3}
            rowsMax={3}
            fullWidth={true}
            onKeyDown={this.sendMessage}
          />
        </form>
      </div>
    );
  }
};

AddMessage.propTypes = {
  activeRoom: PropTypes.string,
  scrollToBottom: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default AddMessage;
