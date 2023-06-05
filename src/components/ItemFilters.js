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
import { MultiSelectBtn } from './MultipleSelect';

const UserFilters = ({ filters, setFilters, cats, refresh, ...props }) => {
  //console.log('cats', cats);

  return (
    <>
      <Search1Field
        key="Items_Filter_Name"
        variant="outlined"
        type="text"
        size="small"
        value={filters.name}
        onChange={(event) => setFilters({ ...filters, name: event.target.value })}
        placeholder="Megnevezés"
        InputProps={{
          onKeyUp: (event) => {
            if (event.keyCode === 13) {
              refresh();
            }
          },
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
                  setFilters({ ...filters, name: '' });
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
        key="Items_Filter_Cats"
        variant="outlined"
        margin="dense"
        name="cats"
        label="Kategóriák"
        options={cats.map((c) => ({ ...c, key: c.id }))}
        value={filters.cats ?? []}
        onChange={(event) => {
          const val = event.target.value;
          console.log('cats', cats, 'value', val);
          setFilters({ ...filters, cats: val });
        }}
      />

      <ReFreshBtn callback={refresh} />
    </>
  );
};

export default UserFilters;

const Search1Field = styled(TextField)`
  position: fixed !important;
  width: 340px;
  right: 510px;
  top: 101px;
`;

const Search2Field = styled(MultiSelectBtn)`
  position: fixed !important;
  width: 340px;
  right: 170px;
  top: 97px;
`;
