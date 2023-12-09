// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import store from '../store.js';
import { Provider } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <Router>
        <Toaster />
          <App />
        </Router>
      </Provider>
  </React.StrictMode>,
);
