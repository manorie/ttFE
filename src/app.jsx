import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <h1>
      <Routes />
    </h1>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app')); // eslint-disable-line
