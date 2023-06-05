// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import categoryServices from '../services/categoryServices';
import Search from '@mui/icons-material/Search';

const Filters = ({ cat, setCat, theme, setTheme, text, setText, themes, showError }) => {
  const [cats, setCats] = useState([]);

  const getCats = async () => {
    try {
      const response = await categoryServices.getList();
      console.log(response);
      if (response?.data?.status !== 'OK') {
        showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
        return;
      }

      let res = [];
      response.data.list.forEach((fo) => {
        // Főkategória
        res.push(fo);
        // Alkategóriák
        fo.items.forEach((al) => res.push(al));
      });
      console.log('res', res);
      setCats(res);
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getCats(), []);

  return (
    <Root>
      <Field
        select
        variant="outlined"
        value={cat || ''}
        label="Kategória"
        InputLabelProps={{ shrink: true }}
        onChange={(event) => {
          const value = event.target.value;
          setCat(value || null);
          if (value) setTheme(null);
        }}>
        <MenuItem value="">Mind</MenuItem>
        {cats &&
          cats.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.text}
            </MenuItem>
          ))}
      </Field>
      <Field
        select
        variant="outlined"
        value={theme || ''}
        label="Téma"
        InputLabelProps={{ shrink: true }}
        onChange={(event) => {
          setTheme(parseInt(event.target.value) || null);
        }}>
        <MenuItem value="">Mind</MenuItem>
        {(cat ? themes.filter((theme) => theme.category === cat) : themes).map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.text}
          </MenuItem>
        ))}
      </Field>
      <Field
        variant="outlined"
        value={text}
        label=" Név, Kód"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setText(event.target.value)}
      />
    </Root>
  );
};

export default Filters;

/// cat, setCat, theme, setTheme, text, setText, themes, showError
Filters.propTypes = {
  cat: PropTypes.number,
  setCat: PropTypes.func.isRequired,
  theme: PropTypes.number,
  setTheme: PropTypes.func.isRequired,
  text: PropTypes.string,
  setText: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
};

const Field = styled(TextField)`
  margin: -8px 8px 8px;
`;

const Root = styled.div`
  float: right;
  margin: -8px 8px 8px;
  & .MuiTextField-root {
    width: 200px;
  }
`;
