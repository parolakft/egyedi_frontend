// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import LoggedOutLayout from './layout/LoggedOutLayout';
import ProtectedRoute from './router/ProtectedRoute';
import { AuthProvider } from './contexts/auth/authContext';
import ActivatePage from './pages/ActivatePage';
import ResetPassword from './pages/ResetPassword';
import Layout from './layout/Layout';
// import TitleComponent from './components/TitleComponent/TitleComponent';
import { SettingsProvider } from './contexts/settings/settingsContext';

const App = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CssBaseline />
        <Router basename="/admin">
          <Switch>
            <Route path="/activate/:code" component={ActivatePage} />
            <Route path="/password/:token" component={ResetPassword} />
            <Route exact path="/login">
              <LoggedOutLayout />
            </Route>
            <ProtectedRoute path="/">
              <Layout />
            </ProtectedRoute>
          </Switch>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
