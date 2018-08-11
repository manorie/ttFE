import React from 'react';
import PrivateRoute from '../privateRoute';

const NotFound = () => (
  <PrivateRoute>
    <h1>
      Dashboard
    </h1>
  </PrivateRoute>
);

module.exports = NotFound;
