import React, { Component } from 'react';
import './App.css';
import Room from './components/Room/Room';
import Message from './components/Message/Message';
import User from './components/User';
import logo from './css/images/prattle-logo.png';
import login from './css/images/login-bg.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      activeRoom: null,
      user: null
    });
  }

  setUser(user) {
    this.setState({
      activeRoom: null,
      user: user
    });
  }

  setActiveRoom(roomId) {
    if (roomId === this.state.activeRoom) return;
    this.setState({
      activeRoom: roomId
    });
  }

  render() {
    return (
      <div className={"mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header" + (this.state.user ? ' logged-in' : ' logged-out')}>
        <header className="mdl-layout__header">
          <div className="app-header mdl-layout__header-row">
            <span className="mdl-layout-title">
              <img src={logo} alt="Prattle" className="logo" />
            </span>
            <div className="mdl-layout-spacer"></div>
          </div>
          <User
            setUser={(isLoggedIn) => this.setUser(isLoggedIn)}
            user={this.state.user}
            ></User>
        </header>
          <div className="app-drawer mdl-layout__drawer">
            <div className={this.state.user ? '' : ' hidden'}>
              <Room
                  activeRoom={this.state.activeRoom}
                  setActiveRoom={(roomId) => this.setActiveRoom(roomId)}
                  user={this.state.user}
              ></Room>
            </div>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className={'App' + (this.state.user ? ' logged-in' : ' logged-out')}>
              <div className="chatroom-container">
                <Message
                  activeRoom={this.state.activeRoom}
                  user={this.state.user}
                ></Message>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
