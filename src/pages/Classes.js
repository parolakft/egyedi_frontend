// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ClassesList from '../components/ClassesList';
import classesServices from '../services/classesServices';

const ClassesPage = ({ showError }) => {
  const [list, setList] = useState([]);

  const getClasses = async () => {
    try {
      const response = await classesServices.getList();
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
    getClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveClass = async (data) => {
    const resp = await classesServices.save(data);
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getClasses();
  };

  const delClass = async (id) => {
    const resp = await classesServices.del({ id: id });
    // DONE hibakezelés
    if (resp?.data?.status !== 'OK') {
      showError('error', 'Rendszerhiba!', resp?.data?.messages[0]);
      return;
    }
    getClasses();
  };

  return (
    <Root>
      <ClassesList
        data={list}
        saveData={saveClass}
        delData={delClass}
        getData={getClasses}
        showError={showError}
      />
    </Root>
  );
};

export default ClassesPage;

ClassesPage.propTypes = {
  showError: PropTypes.func.isRequired,
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
