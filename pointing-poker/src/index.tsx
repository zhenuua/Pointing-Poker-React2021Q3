import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store/store';

import App from './App';

import SocketsProvider from './context/socket.context';

import './index.module.scss';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <SocketsProvider>
        <App />
      </SocketsProvider>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
