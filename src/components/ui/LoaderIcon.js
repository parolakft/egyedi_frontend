// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const LoaderIcon = props => {
  return (
    <Loader
      type='Triangle'
      visible={true}
      color='rgba(49, 139, 129, 1)'
      height={75}
      width={75}
      style={props.style}
    />
  );
};

export default LoaderIcon;
