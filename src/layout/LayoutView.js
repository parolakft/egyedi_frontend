// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import ReportIcon from '@mui/icons-material/Assessment';
import ProductIcon from '@mui/icons-material/Fastfood';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import UserIcon from '@mui/icons-material/Person';
import TuneIcon from '@mui/icons-material/Tune';
import SyncIcon from '@mui/icons-material/Sync';
import GroupIcon from '@mui/icons-material/Group';
import AboutIcon from '@mui/icons-material/LocalOffer';
import PolicyIcon from '@mui/icons-material/Policy';
import ToolsIcon from '@mui/icons-material/Build';

import AppRouter from '../router/AppRouter';
import HeaderBar, { drawerHeight } from './components/HeaderBar';
import Notification from '../components/Notification';

import { permAdmin, permTop } from '../utils/constants';
import { verPerm } from '../utils/functions';
import { AuthContext } from '../contexts/auth/authContext';
//import authServices from '../services/authServices';

const LayoutView = ({ logout }) => {
  const [open, setOpen] = useState(true);
  const [openSub, setOpenSub] = useState(false);
  const [active, setActive] = useState('/');
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMsg, setAlertMsg] = useState({ title: '', text: '' });
  const [auth] = useContext(AuthContext);
  const [alertCallback, setAlertCallback] = useState(null);

  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => history.listen(() => setActive(history.location.pathname)), []);

  const handleDrawerOpen = () => setOpen(!open);
  const handleOpenSub = () => setOpenSub(!openSub);

  const showError = (type, title, text, callback) => {
    setAlertType(type);
    setAlertMsg({ title, text });
    setAlertCallback(callback);
    return setAlert(true);
  };

  // const token = authServices.verifyToken();
  const top = verPerm(permTop, auth);

  const menuItems = [
    {
      id: 'home',
      text: 'Kezdőlap',
      icon: <HomeIcon />,
      url: '/',
      show: true,
    },
    {
      id: 'users',
      text: 'Felhasználókezelés',
      icon: <UserIcon />,
      url: '/users',
      show: verPerm(permAdmin, auth),
    },
    {
      id: 'products',
      text: 'Termékek',
      icon: <ProductIcon />,
      url: '/products',
      show: top,
    },
    {
      id: 'category',
      text: 'Kategóriakezelés',
      icon: <CategoryIcon />,
      url: '/category',
      show: top,
    },
    {
      id: 'reports',
      text: 'Kimutatások',
      icon: <ReportIcon />,
      url: '/reports',
      show: top,
    },
  ];

  const subMenuItems = [
    {
      id: 'settings',
      text: 'Rendszerszintű beállítások',
      icon: <ToolsIcon />,
      url: '/settings',
      show: top,
    },
    {
      id: 'sync',
      text: 'parMAN szinkron',
      icon: <SyncIcon />,
      url: '/sync',
      show: top,
    },
    {
      id: 'classes',
      text: 'Felhasználói csoportok',
      icon: <GroupIcon />,
      url: '/classes',
      show: top,
    },
    {
      id: 'about',
      text: 'Névjegy',
      icon: <AboutIcon />,
      url: '/about',
      show: top,
    },
    {
      id: 'policy',
      text: 'Adatvédelem',
      icon: <PolicyIcon />,
      url: '/policy',
      show: top,
    },
    {
      id: 'detailed',
      text: 'Részletes értékelési szempontok',
      icon: <TuneIcon />,
      url: '/detailed',
      show: top,
    },
  ];

  console.log('Active:', active);
  return (
    <Root>
      <Notification message={alertMsg.text} open={alert} setOpen={setAlert} variant={alertType} title={alertMsg.title} onAlertClose={alertCallback} />
      <HeaderBar position="fixed" handleDrawerOpen={handleDrawerOpen} logout={logout} />
      <SideBar component="nav" variant="persistent" anchor="left" open={open}>
        <List disablePadding>
          {menuItems
            .filter((item) => item.show)
            .map((item) => (
              <MenuItem button key={item.id} selected={item.url === active} onClick={() => history.push(item.url)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </MenuItem>
            ))}
          {top && (
            <ListItemButton onClick={handleOpenSub}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Beállítások" />
            </ListItemButton>
          )}
          <Divider />
          {openSub &&
            subMenuItems
              .filter((item) => item.show)
              .map((item) => (
                <MenuItem key={item.id} selected={item.url === active} onClick={() => history.push(item.url)}>
                  <ListItemIcon style={{ marginLeft: '10px' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </MenuItem>
              ))}
          {openSub && <Divider />}
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Kijelentkezés" />
          </ListItemButton>
        </List>
      </SideBar>
      <MainContent open={open}>
        <DrawerHeader />
        <AppRouter showError={showError} />
      </MainContent>
    </Root>
  );
};

LayoutView.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default LayoutView;

const drawerWidth = 240;

const Root = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const SideBar = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    top: ${drawerHeight}px;
    width: ${drawerWidth}px;
  }
`;

const DrawerHeader = styled.div`
  background-color: rgba(0, 0, 0, 0);
  min-height: 56px;

  @media (min-width: 600px) {
    min-height: ${drawerHeight}px;
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 16px;
  transition: ${(props) => (props.open ? 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms' : 'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms')};
  margin-left: ${(props) => (props.open ? '0' : `-${drawerWidth}px`)};
  height: 100%;
  width: ${(props) => (props.open ? `calc(100% - ${drawerWidth}px)` : '100%')};
`;

const MenuItem = styled(ListItemButton)`
  border-left: ${(props) => (props.active ? '8px solid #3c8dbc' : '')};
  transition: border-left 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25);
  padding-right: 0;

  & .mainMenu {
    & .MuiListItemText-primary {
      font-weight: 800;
    }
  }
`;
