// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SettingsList from '../components/SettingsList';
import settingsServices from '../services/settingsServices';

const SettingsPage = ({ showError }) => {
  const [list, setList] = useState([]);

  const getSettings = async () => {
    try {
      const response = await settingsServices.list();
      console.log(response);

      if (response?.data?.status !== 'OK') {
        showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
        return;
      }
      setList(response.data.list);
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  useEffect(() => {
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveCfg = async (data) => {
    const resp = await settingsServices.save(data);
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getSettings();
  };

  const delCfg = async (id) => {
    const resp = await settingsServices.del({ id: id });
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getSettings();
  };

  return (
    <Root>
      <SettingsList
        data={list}
        saveData={saveCfg}
        delData={delCfg}
        getData={getSettings}
        showError={showError}
      />
    </Root>
  );
};

export default SettingsPage;

SettingsPage.propTypes = {
  showError: PropTypes.func.isRequired,
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
