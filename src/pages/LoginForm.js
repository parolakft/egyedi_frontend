// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ loginUser }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser(state);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Kérjük jelentkezz be</FormTitle>
      <TextField
        id="email"
        name="email"
        variant="outlined"
        label="Email"
        margin="dense"
        type="email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailIcon style={{ color: 'grey' }} />
            </InputAdornment>
          ),
        }}
        fullWidth
        onChange={handleChange}
        value={state.email}
      />
      <TextField
        id="password"
        name="password"
        variant="outlined"
        label="Jelszó"
        margin="dense"
        type="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon style={{ color: 'grey' }} />
            </InputAdornment>
          ),
        }}
        fullWidth
        onChange={handleChange}
        value={state.password}
      />
      <ButtonRow>
        <Button variant="contained" color="primary" type="submit">
          Küldés
        </Button>
        <Link onClick={() => history.push('/forgotten-password')}>Elfelejtett jelszó</Link>
      </ButtonRow>
    </Form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const Form = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const FormTitle = styled.p`
  margin-top: 0;
  text-align: center;
  color: grey;
  font-weight: 400;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Link = styled.span`
  color: #3c8dbc;
  text-decoration: underline;
  cursor: pointer;
`;
