// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UsersList from '../components/UsersList';
import userServices from '../services/userServices';
import classesServices from '../services/classesServices';

const UsersPage = ({ showError }) => {
  const [list, setList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
  });

  const ures = () => {
    const b = (filters.name || filters.email) && true;
    console.log('filters.ures', b);
    return !b;
  };

  const getUsers = async () => {
    try {
      // Itt azt kéne vizsgálni, hogy filters üres-e...
      // XY-1042 szűrés nélkül is adjon vissza eredményt
      // if (!ures()) {
        const response = await userServices.getList({ ...filters, ures: undefined });
        console.log(response);

        if (response?.data?.status !== 'OK') {
          showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
          return;
        }
        setList(response.data.list.map((user) => ({ ...user, key: user.id })));
      // } else setList([]);
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  const getClasses = async () => {
    const resp = await classesServices.getList();
    console.log(resp);
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Technikai hiba', resp?.data?.status);
      return;
    }
    setClasses(resp.data.list);
  };

  useEffect(() => {
    getUsers();
    getClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveUser = async (data) => {
    const resp = await userServices.save(data);
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }

    getUsers();
  };

  const delUser = async (id) => {
    const resp = await userServices.delUser({ id: id });
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getUsers();
  };

  return (
    <Root>
      <UsersList
        data={list}
        saveData={saveUser}
        delData={delUser}
        getData={getUsers}
        filters={filters}
        setFilters={setFilters}
        classes={classes}
        showError={showError}
      />
    </Root>
  );
};

export default UsersPage;

UsersPage.propTypes = {
  showError: PropTypes.func.isRequired,
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
