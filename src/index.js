import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import './css/normalize.css';
import './css/global.css';
import './css/room.css';
import './css/message.css';
import './css/user.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
