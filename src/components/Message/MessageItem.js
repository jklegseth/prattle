import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.convertTimestamp = this.convertTimestamp.bind(this);
    this.splitNewlines = this.splitNewlines.bind(this);
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
    const message = this.props.message;
    return (
      <li key={this.props.index} className="mdl-list__item mdl-list__item--three-line">
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
    );
  }
};

MessageItem.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired
}

export default MessageItem;
