// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VotesList from '../components/VotesList';
import voteServices from '../services/voteServices';

const VotesPage = ({ mode, showError }) => {
  const [list, setList] = useState([]);
  const { id } = useParams();
  const from = new Date();
  from.setMonth(from.getMonth() - 1, 1);
  const to = new Date();
  to.setHours(24, 0, 0, 0);
  const [filters, setFilters] = useState({
    mode,
    id,
    from: from.toISOString().substr(0, 16),
    to: to.toISOString().substr(0, 16),
  });

  // Azt adja vissza, hogy NEM ÜRES-e!
  const ures = () => {
    console.log('filters', filters);
    const b = !!(filters.mode && filters.id); // && (filters.from || filters.to));
    console.log('filters.ures', b);
    return b;
  };

  const getVotes = async () => {
    try {
      // FIXED Itt azt kéne vizsgálni, hogy filters üres-e...
      if (ures()) {
        const response = await voteServices.getList({ ...filters, ures: undefined });
        console.log(response);

        if (response?.data?.status !== 'OK') {
          showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
          return;
        }
        setList(response.data.list.map((vote) => ({ ...vote, key: vote.id })));
      } else setList([]); // Egyébként ÜRES...
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  useEffect(() => {
    getVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Root>
      <VotesList data={list} getData={getVotes} filters={filters} setFilters={setFilters} mode={mode} showError={showError} />
    </Root>
  );
};

export default VotesPage;

VotesPage.propTypes = {
  mode: PropTypes.string.isRequired,
  showError: PropTypes.func.isRequired,
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
