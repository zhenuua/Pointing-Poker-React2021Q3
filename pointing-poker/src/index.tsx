import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { SocketsProvider } from './context/socket.context';

import App from './App';
import store from './store/store';

import './index.module.scss';
import SocketsProvider from './context/socket.context';

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
