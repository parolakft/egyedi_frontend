// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useContext } from 'react';
import styled from 'styled-components';
import {AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/auth/authContext';

const HeaderBar = ({  handleDrawerOpen, logout, ...props }) => {
  const [auth] = useContext(AuthContext);
  console.log('auth', auth);

  return (
    <StyledAppBar {...props}>
      <Toolbar>
        <MenuButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
          <MenuIcon />
        </MenuButton>
        <Typography variant="h6" noWrap>
          Allergénszűrő Admin Felület - {auth?.user?.name}
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

HeaderBar.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default HeaderBar;

export const drawerHeight = 66;

const StyledAppBar = styled(AppBar)`
  width: 100%;
  background-color: rgb(23, 68, 125);
  height: ${drawerHeight}px;
`;

const MenuButton = styled(IconButton)`
  margin-right: 16px;
`;
