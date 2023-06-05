// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ItemsList from '../components/ItemsList';
import itemServices from '../services/itemServices';
import categoryServices from '../services/categoryServices';

const ItemsPage = ({ showError }) => {
  const [list, setList] = useState([]);
  const [cats, setCats] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    cats: [],
  });

  const ures = () => {
    const b = (filters.name || filters.cats?.length) && true;
    console.log('filters.ures', b);
    return !b;
  };

  const getItems = async () => {
    try {
      // Itt azt kéne vizsgálni, hogy filters üres-e...
      // XY-1042 zűrés nélkül is adjon vissza eredményt
      // if (!ures()) {
        const request = { ...filters, cats: filters.cats.map((cat) => cat.id) };
        const response = await itemServices.getList(request);
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

  const getCats = async () => {
    const resp = await categoryServices.getList();
    console.log(resp);
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Technikai hiba', resp?.data?.status);
      return;
    }
    setCats(resp.data.list.filter((row) => row.childCount === 0));
  };

  useEffect(() => {
    getItems();
    getCats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveUser = async (data) => {
    const resp = await itemServices.save(data);
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getItems();
  };

  const delUser = async (id) => {
    const resp = await itemServices.delItem({ id: id });
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getItems();
  };

  return (
    <Root>
      <ItemsList
        data={list}
        saveData={saveUser}
        delData={delUser}
        getData={getItems}
        filters={filters}
        setFilters={setFilters}
        cats={cats}
        showError={showError}
      />
    </Root>
  );
};

export default ItemsPage;

ItemsPage.propTypes = {
  showError: PropTypes.func.isRequired,
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
