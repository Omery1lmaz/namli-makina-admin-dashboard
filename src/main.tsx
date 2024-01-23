import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { HistoryRouter as RouterH } from 'redux-first-history/rr6';
import { history } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterH history={history}>
      <App />
    </RouterH>
  </Provider>
);
