import React, { Component } from 'react';
import './App.css';
import Room from './components/Room/Room';
import Message from './components/Message/Message';
import User from './components/User';
import logo from './css/images/prattle-logo.png';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import Drawer from 'material-ui/Drawer';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import AppBar from 'material-ui/AppBar';

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {
  constructor(props) {
    super(props);
    //https://cimdalli.github.io/mui-theme-generator/
    this.muiTheme = getMuiTheme({
    "palette": {
        "primary1Color": "#ff5722",
        "accent1Color": "#2196F3",
        "textColor": "#333333",
        "secondaryTextColor": "#333"
    }
});

    this.state = ({
      activeRoom: null,
      user: null,
      drawerVisible: false,
      authChecked: false
    });
  }

  setUser(user) {
    this.setState({
      activeRoom: null,
      user: user,
      authChecked: true
    });
  }

  setActiveRoom(roomId) {
    if (roomId === this.state.activeRoom) return;
    this.setState({
      activeRoom: roomId,
      drawerVisible: false
    });
  }

  toggleDrawer = () => {
    if (!this.state.user) return;
    this.setState({
      drawerVisible: !this.state.drawerVisible
    });
  }

  componentDidMount() {
    if (this.state.user) {
      this.toggleDrawer();
    }
  }

  render() {
    const AppBarImage = () => (
      <div className="app-logo">
        <img src={logo} alt="Prattle" className="logo" />
      </div>
    );

    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className={this.state.authChecked ? (this.state.user ? '' : 'logged-out') : ''}>
          <header>
            <AppBar
              title={<AppBarImage />}
              onLeftIconButtonTouchTap={this.toggleDrawer}
              className="app-appbar"
              iconElementRight={
                <span>
                  <User setUser={(isLoggedIn) => this.setUser(isLoggedIn)} user={this.state.user}/>
                </span>
              }
            />
          </header>
          {this.state.user ?
            <Drawer open={this.state.drawerVisible}>
              <div className="app-drawer">
                  <CloseIcon className="app-drawer-close" onClick={this.toggleDrawer}/>
                  <Room
                    activeRoom={this.state.activeRoom}
                    setActiveRoom={(roomId) => this.setActiveRoom(roomId)}
                    user={this.state.user} />
              </div>
            </Drawer>
          : null }
          <main>
            <div className="page-content">
              {this.state.user ?
                <div className="chatroom-container">
                  <Message
                    activeRoom={this.state.activeRoom}
                    user={this.state.user}
                  ></Message>
                </div>
              : null }
            </div>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
