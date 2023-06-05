// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MultipleSelect from './MultipleSelect';
import PropTypes from 'prop-types';

const CustomInput = ({ selectItems, textArea, fullWidth, select, label, multiple, divider, ...props }) => {
  // console.log('value', typeof props.value, props.value);

  if (divider) {
    return <Divider style={{ margin: '10px 0' }} />;
  }
  if (multiple) {
    return <MultipleSelect options={selectItems} label={label} {...props} />;
  }
  if (select) {
    console.log('selectItems', selectItems);
    return (
      <FormControl margin="dense">
        <InputLabel shrink style={{ fontSize: '16px' }}>
          {label}
        </InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: '250px',
                fontSize: '16px',
              },
            },
          }}
          size="small"
          style={{ fontSize: '16px' }}
          label={label}
          {...props}>
          {selectItems.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <TextField
      variant="outlined"
      size="small"
      multiline={textArea}
      style={{ minWidth: !fullWidth && '200px' }}
      label={label}
      {...props}
      InputProps={{
        style: {
          fontSize: '16px',
        },
      }}
      InputLabelProps={{
        shrink: true,
        style: {
          fontSize: '16px',
        },
      }}
      fullWidth={fullWidth}
    />
  );
};

CustomInput.propTypes = {
  selectItems: PropTypes.arrayOf(PropTypes.shape({})),
  textArea: PropTypes.bool,
  fullWidth: PropTypes.bool,
  select: PropTypes.bool,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  divider: PropTypes.bool,
};

CustomInput.defaultProps = {
  selectItems: [],
  textArea: false,
  fullWidth: false,
  select: false,
  label: null,
  multiple: false,
  hide: false,
  divider: false,
};

export default CustomInput;
