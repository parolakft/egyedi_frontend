import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CustomInput from './CustomInput';

const EditDialog = ({ open, handleClose, data, onSubmit, inputs, title, showError }) => {
  // Nem volt kezdőérték???
  const { imageUrl, ...rest } = data ? data : {};
  const [state, setState] = useState({ ...rest });

  useEffect(() => {
    if (data) {
      setState({ ...data });
    }
  }, [data]);

  const handleChange = (event, type) => {
    const { name, value } = event.target;
    let newVal = value;

    if (type === 'checkbox') {
      newVal = event.target.checked;
    }

    if (type === 'number') {
      newVal = value.replace(/[^\d]+/g, '');
    }

    if (type === 'numeric') {
      newVal = newVal.replace(/[,]/g, '.');
      newVal = newVal.replace(/[^0-9.]/g, '');
      newVal = newVal.replace(/\.(?=.*\.)/g, '');

      const decimalIndex = newVal.indexOf('.');
      if (decimalIndex !== -1) {
        newVal = newVal.substr(0, decimalIndex + 2);
      }
    }

    setState({
      ...state,
      [name]: newVal,
    });
  };

  const handleSubmit = () => {
    onSubmit(state);
  };

  const wrapperStyle = (prop) => {
    switch (prop) {
      case 'max':
        return '700px';
      case 'min':
        return '420px';
      default:
        return null;
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Title>{title}</Title>
          <StyledDivider />
          <Wrapper max={wrapperStyle('max')} min={wrapperStyle('min')}>
            {inputs.map((input) => (
              <CustomInput
                {...input}
                variant="outlined"
                margin="dense"
                key={`${title}_${input.id}`}
                value={state && state[input.id]}
                defaultChecked={input.type === 'checkbox' ? state && state[input.id] : null}
                fullWidth
                onChange={(event) => handleChange(event, input.type)}
              />
            ))}
            <ButtonRow>
              <Button onClick={handleSubmit}>Mentés</Button>
            </ButtonRow>
          </Wrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDialog;

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape()),
  title: PropTypes.string.isRequired,
  showError: PropTypes.func,
};

EditDialog.defaultProps = {
  inputs: [],
  showError: null,
};

const Wrapper = styled.div`
  max-width: ${(props) => (props.max ? props.max : '')};
  min-width: ${(props) => (props.min ? props.min : '')};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 8px;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 24px;
  margin: 8px;
  color: #949494;
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 16px;
  width: 100%;
`;

const ButtonRow = styled.div`
  text-align: right;
  margin-top: 8px;
`;
