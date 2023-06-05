// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import { Button as MuiButton } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Add from '@mui/icons-material/AddBox';
import Refresh from '@mui/icons-material/Refresh';

const Button = ({ type, children, ...rest }) => {
  return (
    <StyledButton {...rest} variant="contained" type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: null,
};

const StyledButton = styled(MuiButton)`
  border-radius: 0;
  background-color: ${(props) => (props.color === 'secondary' ? '#f78383' : '#3c8dbc')};
  color: white;

  &:hover {
    background-color: ${(props) => (props.color === 'secondary' ? '#c75252' : '#2c6c91')};
  }
`;

///

const CatButtons = ({ onAdd }) => {
  return (
    <>
      <Btn color="primary" variant="contained" onClick={() => onAdd({ category: true })}>
        <Add />
        &nbsp;Új téma
      </Btn>
      <Btn color="primary" variant="contained" onClick={() => onAdd({})}>
        <Add />
        &nbsp;Új kategória
      </Btn>
    </>
  );
};

CatButtons.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

const ReFreshBtn = ({ callback }) => {
  return (
    <Btn2 color="primary" variant="contained" onClick={() => callback()}>
      <Refresh />
      &nbsp;Frissítés
    </Btn2>
  );
};

ReFreshBtn.propTypes = {
  callback: PropTypes.func.isRequired,
};

const Btn = styled(Button)`
  float: right;
  margin: -8px 8px 8px;
`;

const Btn2 = styled(Button)`
  position: fixed !important;
  right: 20px;
  top: 106px;
`;

export { CatButtons, ReFreshBtn };
