// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';
import Notification from '../components/Notification';
import ForgottenPasswordForm from '../pages/ForgottenPasswordForm';
import authServices from '../services/authServices';
import { AuthContext } from '../contexts/auth/authContext';

const LoggedOutLayout = () => {
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMsg, setAlertMsg] = useState({ title: '', text: '' });
  const history = useHistory();
  const [, setAuth] = useContext(AuthContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const decodeToken = async () => {
      const tokenData = await authServices.verifyToken();

      if (!tokenData || tokenData === 'EXPIRED') return;

      history.push('/');
    };

    if (token) decodeToken();
  });

  const loginUser = async (request) => {
    let response;

    try {
      response = await authServices.loginUser(request);
    } catch (error) {
      console.error(error);
    }
    console.log('login válasz:', response);
    if (!response || response.data.status !== 'OK') {
      setAlertMsg({ title: 'Hiba', text: 'Hibás email cím vagy jelszó!' });
      setAlertType('error');

      return setAlert(true);
    }

    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    setAuth(response.data);
    console.log('login token:', sessionStorage.getItem('token'));

    return history.push('/');
  };

  const requestNewPassword = async (email) => {
    const response = await authServices.requestNewPassword({ email });
    console.log(response);
    if (response?.data?.status === 'OK') {
      setAlertMsg({ title: '', text: 'Email elküldve' });
      setAlertType('success');

      return setAlert(true);
    }
    setAlertMsg({
      title: 'Hiba',
      text: 'A megadott email cím nem szerepel rendszerünkben.',
    });
    setAlertType('error');

    return setAlert(true);
  };

  return (
    <Container>
      <Notification message={alertMsg.text} open={alert} setOpen={setAlert} variant={alertType} title={alertMsg.title} />
      <Span> Admin </Span>{' '}
      <Box elevation={3}>
        <Router basename="/admin">
          <Switch>
            <Route exact path="/login">
              <LoginForm loginUser={loginUser} />{' '}
            </Route>{' '}
            <Route exact path="/forgotten-password">
              <ForgottenPasswordForm requestNewPassword={requestNewPassword} />{' '}
            </Route>{' '}
          </Switch>{' '}
        </Router>{' '}
      </Box>{' '}
    </Container>
  );
};

export default LoggedOutLayout;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #d2d6de;
  display: flex;
  flex-direction: column;
  padding-top: 8em;
  align-items: center;
`;

const Box = styled(Paper)`
  padding: 16px;
  max-width: 400px;
  border-radius: 0;
`;

const Span = styled.span`
  font-size: 3em;
  font-weight: 300;
  color: grey;
`;
