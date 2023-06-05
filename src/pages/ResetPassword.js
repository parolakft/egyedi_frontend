// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';
import {useParams } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import authServices from '../services/authServices';
import Notification from '../components/Notification';


const ResetForm = () => {
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMsg, setAlertMsg] = useState({ title: '', text: '' });
  const [state, setState] = useState({
    password1: '',
    password2: '',
  });

  const { token } = useParams();



  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { password1, password2 } = state;
    if (!password1 || !password2) {
      setAlertMsg({title:'Hiba!',text:'Mindkét mező kitöltése szükséges!'});
      setAlertType('error');
      setAlert(true)
    } else if (password1 !== password2) {
      setAlertMsg({title:'Hiba!',text:'A két jelszó nem egyezik meg!'});
      setAlertType('error');
      setAlert(true)
    } else 
      try {
        const response = await authServices.resetPassword({token, password:password1});
        if (response.data.status === 'OK') {
          setAlertMsg({title:'Siker!',text:'A jelszóváltoztatás megtörtént!'});
          setAlertType('success');
          setAlert(true)
        } else {
          setAlertMsg({title:'Hiba!',text:response.data.messages[0]});
          setAlertType('error');
          setAlert(true)
        }
      } catch (error) {
        setAlertMsg({title:'Hiba!',text: 'TECHNIKAI HIBA'});
          setAlertType('error');
          setAlert(true)
      }
  };



  return (
    <Box elevation={3}>
    <Notification message={alertMsg.text} open={alert} setOpen={setAlert} variant={alertType} title={alertMsg.title} />
    <Form onSubmit={handleSubmit}>
      <FormTitle>Adja meg az új jelszavát!</FormTitle>
      <TextField
        id="password1"
        name="password1"
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
        value={state.password1}
      />
      <TextField
        id="password2"
        name="password2"
        variant="outlined"
        label="Jelszó újra"
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
        value={state.password2}
      />
      <ButtonRow>
        <Button variant="contained" color="primary" type="submit">
          Küldés
        </Button>
      </ButtonRow>
    </Form>
    </Box>
  );
};

export default ResetForm;


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
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Box = styled(Paper)`
  padding: 16px;
  max-width: 400px;
  border-radius: 0;
  margin: 100px auto;
`;
