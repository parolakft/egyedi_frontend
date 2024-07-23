// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DetailedList from '../components/DetailedList';
import detailedServices from '../services/detailedServices';

const DetailedPage = ({ showError }) => {
  const [list, setList] = useState([]);

  const getDetailed = async () => {
    try {
      const response = await detailedServices.getList();
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
    getDetailed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveDetail = async data => {
    try {
      const resp = await detailedServices.save(data);
      // DONE hibakezelés
      if (resp?.data?.status !== 'OK') {
        showError('error', 'Hiba!', resp?.data?.messages[0]);
        return;
      }
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
    getDetailed();
  };

  const delDetail = async id => {
    try {
      const resp = await detailedServices.del(id);
      // DONE hibakezelés
      if (
        resp?.data?.messages instanceof Array &&
        resp?.data?.messages.length > 0 &&
        resp?.data?.messages[0]?.startsWith('ERROR: update or delete on table "vote_details" violates foreign key constraint')
      ) {
        showError('error', 'Hiba!', 'Erre a szempontra már adtak le értékelést!');
        return;
      } else if (resp?.data?.status !== 'OK') {
        showError('error', 'Hiba!', resp?.data?.messages[0]);
        return;
      }
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
    getDetailed();
  };

  const setOrder = async (row, order) => {
    try {
      const req = { id: row.id, order: order };
      const resp = await detailedServices.setOrder(req);
      // DONE hibakezelés
      if (resp?.data?.status !== 'OK') {
        showError('error', 'Hiba!', resp?.data?.messages[0]);
        return;
      }
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
    getDetailed();
  };

  return (
    <Root>
      <DetailedList data={list} saveData={saveDetail} delData={delDetail} getData={getDetailed} showError={showError} onMove={setOrder} />
    </Root>
  );
};

export default DetailedPage;

DetailedPage.propTypes = {
  showError: PropTypes.func.isRequired
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
