// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SettingsContext = React.createContext([{}, () => {}]);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ simplepay: '', parman: '' });
  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { SettingsContext, SettingsProvider };
