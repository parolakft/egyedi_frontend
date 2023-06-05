// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProtectedRoute from './ProtectedRoute';
import Users from '../pages/Users';
import Items from '../pages/Items';
import Categories from '../pages/Categories';
import Settings from '../pages/Settings';
import Classes from '../pages/Classes';
import About from '../pages/About';
import Policy from '../pages/Policy';
import Detailed from '../pages/Detailed';
import Welcome from '../pages/Welcome';
import Synchron from '../pages/Synchron';
import Votes from '../pages/Votes';

const AppRouter = ({ showError }) => {
  return (
    <Switch>
      {/* Főmenü */}
      <ProtectedRoute path="/users/votes/:id">
        <Votes mode="user" showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/users">
        <Users showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/products/votes/:id">
        <Votes mode="item" showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/products">
        <Items showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/category">
        <Categories showError={showError} />
      </ProtectedRoute>
      {/* Beállítások almenü */}
      <ProtectedRoute path="/settings">
        <Settings showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/sync">
        <Synchron showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/classes">
        <Classes showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/about">
        <About showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/policy">
        <Policy showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute path="/detailed">
        <Detailed showError={showError} />
      </ProtectedRoute>
      <ProtectedRoute exact path="/">
        <Welcome hello="XY egyedi admin!" />
      </ProtectedRoute>
    </Switch>
  );
};

export default AppRouter;

AppRouter.propTypes = {
  showError: PropTypes.func.isRequired,
};
