// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from './Button';

const Box = ({ children, title, controls, onSubmit, buttonText, onReset, ...rest }) => {
  return (
    <StyledDiv {...rest}>
      {(title || controls) && (
        <>
          <Title>
            {title || ''}
            {controls || ''}
          </Title>
          <StyledDivider />
        </>
      )}
      {children}
      {onSubmit && (
        <ButtonRow multiple={onReset ? 1 : 0}>
          {onReset && (
            <Button color="secondary" onClick={onReset}>
              Eredeti visszaállítása
            </Button>
          )}
          <Button onClick={onSubmit}>{buttonText || 'Mentés'}</Button>
        </ButtonRow>
      )}
    </StyledDiv>
  );
};

export default Box;
Box.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  onReset: PropTypes.func,
};

Box.defaultProps = {
  children: null,
  onSubmit: null,
  buttonText: '',
  onReset: null,
};

const StyledDiv = styled(Paper)`
  padding: 16px;
  max-width: ${(props) => (props.max ? props.max : '')};
  min-width: ${(props) => (props.min ? props.min : '')};
  display: flex;
  flex-grow: ${(props) => (props.noGrow ? null : '1')};
  flex-direction: column;
  margin: 8px;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 24px;
  margin: 8px;
  color: #949494;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: ${(props) => (props.multiple ? 'space-between' : 'flex-end')};
  margin-top: 8px;
`;
