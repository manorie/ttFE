import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, token }) => {
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      {children}
    </div>
  );
};

PrivateRoute.propTypes = {
  token: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = ({
  user: {
    token,
  },
}) => ({
  token,
});

module.exports = connect(mapStateToProps)(PrivateRoute);
