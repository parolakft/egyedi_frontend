// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const MultipleSelect = ({ options, label, name, onChange, ...props }) => {
  const handleChange = (event, newValue) => {
    const fakeEvent = { target: { name, value: newValue } };
    onChange(fakeEvent);
  };

  // console.log('onChange', onChange, 'props', props);

  return (
    <>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        filterSelectedOptions
        disableCloseOnSelect
        name={name}
        onChange={handleChange}
        {...props}
        renderOption={(props, option, state) => <Chip color="primary" variant="outlined" size="small" label={option.name} {...props} />}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label + (props.required ? ' *' : '')}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </>
  );
};

const MultiSelectBtn = ({ options, label, name, onChange, ...props }) => {
  const handleChange = (event, newValue) => {
    const fakeEvent = { target: { name, value: newValue } };
    onChange(fakeEvent);
  };

  console.log('props', props);

  return (
    <>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disableCloseOnSelect
        name={name}
        onChange={handleChange}
        {...props}
        renderOption={(props, option, state) => (
          <Chip color="primary" variant="filled" size="small" label={option.name} {...props} style={{ margin: '1px' }} />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label + (props.required ? ' *' : '')}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
              size: 'small',
              multiline: false,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: null,
              style: { padding: '1px 4px' },
            }}
          />
        )}
      />
    </>
  );
};

export default MultipleSelect;
export { MultiSelectBtn };

MultipleSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

MultiSelectBtn.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
