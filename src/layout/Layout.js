// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/authContext';
import authServices from '../services/authServices';
import LayoutView from './LayoutView';
// import { SettingsContext } from '../contexts/settings/settingsContext';
// import companyDataServices from '../services/companyDataServices';

const Layout = () => {
  const [auth, setAuth] = useContext(AuthContext);
  //const [settings, setSettings] = useContext(SettingsContext);

  const history = useHistory();

  useEffect(() => {
    const tokenData = authServices.verifyToken();
    setAuth({
      ...auth,
      userEmail: tokenData.payload.sub,
      userId: tokenData.payload.user,
      companyId: tokenData.payload.company,
      companyName: tokenData.payload.companyName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth]);

  // useEffect(() => {
  //   const getSettings = async () => {
  //     try {
  //       // const simple = await companyDataServices.getSettings('simplepay');
  //       // const parman = await companyDataServices.getSettings('parman');

  //       // setSettings({
  //       //   simplepay: simple.data.data.value,
  //       //   parman: parman.data.data.value
  //       // });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getSettings();
  // }, [setSettings]);

  const logout = () => {
    authServices.logoutUser();

    history.push('/');
  };

  return <LayoutView logout={logout} />;
};

export default Layout;
