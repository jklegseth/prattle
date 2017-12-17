import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import avatar from './../../css/images/avatar.png';

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
    return message.replace(/\n/g, '||');
  }

  render() {
    const message = this.props.message;

    return (
      <div>
        <ListItem
          disabled={true}
          innerDivStyle={{height: 'auto'}}
          nestedListStyle={{height: 'auto'}}
          style={{height: 'auto'}}
          key={this.props.index}
          leftAvatar={
            <span>
              <Avatar src={avatar} />
            </span>
          }
          primaryText={
            <span>
              {message.username}
              <span className="message-item-date">{this.convertTimestamp(message.submittedAt)}</span>
            </span>
          }
          secondaryText={
            <ReactMarkdown source={message.content} className="list-item" />
          }
        />
        <Divider inset={true} />
      </div>
    );
  }
};

MessageItem.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired
}

export default MessageItem;
