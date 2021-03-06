import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import CookieSync from './containers/cookieSync';
import Routes from './routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <CookiesProvider>
      <CookieSync>
        <Routes />
      </CookieSync>
    </CookiesProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app')); // eslint-disable-line
