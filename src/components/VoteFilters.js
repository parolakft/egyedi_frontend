// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import styled from 'styled-components';
import { ReFreshBtn } from './Button';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const UserFilters = ({ filters, setFilters, refresh, ...props }) => {
  return (
    <>
      <Search1Field
        variant="outlined"
        type="datetime-local"
        size="small"
        value={filters.from}
        onChange={(event) => setFilters({ ...filters, from: event.target.value })}
        onKeyUp={(event) => {
          if (event.keyCode === 13) {
            refresh();
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ cursor: 'default' }} color="disabled" fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                display: filters.name ? 'flex' : 'none',
              }}>
              <ClearIcon
                style={{ cursor: 'pointer' }}
                fontSize="small"
                onClick={(event) => {
                  setFilters({ ...filters, from: '' });
                }}
              />
            </InputAdornment>
          ),
          disableUnderline: true,
          style: {
            background: 'white',
            border: 'solid white',
            borderWidth: '4px 10px',
            borderRadius: '4px',
          },
        }}
      />
      <Search2Field
        variant="outlined"
        type="datetime-local"
        size="small"
        value={filters.to}
        onChange={(event) => setFilters({ ...filters, to: event.target.value })}
        onKeyUp={(event) => {
          if (event.keyCode === 13) {
            refresh();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                display: filters.to ? 'flex' : 'none',
              }}>
              <ClearIcon
                style={{ cursor: 'pointer' }}
                fontSize="small"
                onClick={(event) => {
                  setFilters({ ...filters, to: '' });
                }}
              />
            </InputAdornment>
          ),
          disableUnderline: true,
          style: {
            background: 'white',
            border: 'solid white',
            borderWidth: '4px 10px',
            borderRadius: '4px',
          },
        }}
      />
      <ReFreshBtn callback={refresh} />
    </>
  );
};

export default UserFilters;

const Search1Field = styled(TextField)`
  position: fixed !important;
  width: 280px;
  right: 440px;
  top: 101px;
`;

const Search2Field = styled(Search1Field)`
  right: 160px;
`;
