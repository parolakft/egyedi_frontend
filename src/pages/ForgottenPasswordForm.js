// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ForgottenPasswordForm = ({ requestNewPassword }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleChange = (event) => {
    const { value } = event.target;

    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    requestNewPassword(email);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle large>Elfelejtett jelszó</FormTitle>
      <FormTitle>Kérjük adja meg a regisztrált email címét, hogy elküldhessük az új jelszót!</FormTitle>
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
        value={email}
      />
      <ButtonRow>
        <Button variant="contained" color="primary" type="submit">
          Küldés
        </Button>
        <Link onClick={() => history.push('/login')}>Login</Link>
      </ButtonRow>
    </Form>
  );
};

export default ForgottenPasswordForm;

ForgottenPasswordForm.propTypes = {
  requestNewPassword: PropTypes.func.isRequired,
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
  font-size: ${(props) => (props.large ? '20px' : '')};
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
