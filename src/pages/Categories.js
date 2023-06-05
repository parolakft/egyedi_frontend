// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CategoriesList from '../components/CategoryList';
import categoryServices from '../services/categoryServices';

const CategoriesPage = ({ showError }) => {
  const [list, setList] = useState([]);

  const getItems = async () => {
    try {
      const response = await categoryServices.getList();
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
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveUser = async (data) => {
    const resp = await categoryServices.save(data);
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getItems();
  };

  const delUser = async (id) => {
    const resp = await categoryServices.delCat({ id: id });
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getItems();
  };

  return (
    <Root>
      <CategoriesList
        data={list}
        saveData={saveUser}
        delData={delUser}
        getData={getItems}
        cats={list.filter((cat) => cat.itemCount === 0)}
        showError={showError}
      />
    </Root>
  );
};

export default CategoriesPage;

CategoriesPage.propTypes = {
  showError: PropTypes.func.isRequired,
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
