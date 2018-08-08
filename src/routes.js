import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './containers/not-found';
// import Login from './containers/user/login';
// import Register from './containers/user/register';
import Dashboard from './containers/dashboard';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      {/* <Route path="/login" component={Login} /> */}
      {/* <Route path="/register" component={Register} /> */}

      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);


export default Routes;
