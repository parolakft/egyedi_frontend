// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '../components/Box';
import PropTypes from 'prop-types';
import settingsServices from '../services/settingsServices';
import { Button } from '@mui/material';
import StartIcon from '@mui/icons-material/PlayArrow';

const SynchronPage = ({ showError }) => {
  const [log, setLog] = useState('');

  const getLog = async () => {
    try {
      const response = await settingsServices.syncLog();
      console.log(response);
      if (response?.data?.status !== 'OK') {
        showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
        return;
      }
      setLog(response.data.data);
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(getLog, 2000);
    return () => clearTimeout(timer);
  });

  const start = async () => {
    try {
      const response = await settingsServices.sync();
      console.log(response);

      if (response?.data?.status !== 'OK') {
        showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
        return;
      }

      showError('success', 'Siker', 'Szinkronizálás elindítva.');
      getLog();
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  return (
    <Root
      max="100%"
      title="Szinkronizálás a parMAN rendszerrel"
      controls={
        <Btn variant="contained" onClick={start} startIcon={<StartIcon />}>
          Start
        </Btn>
      }>
      <div dangerouslySetInnerHTML={{ __html: log }} />
    </Root>
  );
};

export default SynchronPage;

SynchronPage.propTypes = {
  showError: PropTypes.func.isRequired,
};

const Root = styled(Box)`
  margin: auto;
`;

const Btn = styled(Button)`
  float: right;
`;
