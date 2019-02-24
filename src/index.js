import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './services/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// eslint-disable-next-line
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch({ type: 'SIGN_IN', payload: user });
  } else {
    store.dispatch({ type: 'SIGN_OUT' });
  }
});

// FIXME: This isn't ideal at all :(
setTimeout(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}, 2000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
