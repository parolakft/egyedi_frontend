// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import authServices from '../services/authServices';

const ProtectedRoute = ({ children, path }) => {
  return (
    <Route
      path={path}
      render={({ location }) => {
        const token = authServices.verifyToken();

        if (!token) {
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }

        if (token === 'EXPIRED') {
          authServices.logoutUser();
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }

        return children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
};

export default ProtectedRoute;
