// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowUp from '@mui/icons-material/ArrowUpward';
import ArrowDown from '@mui/icons-material/ArrowDownward';

const OrderItem = ({ row, onMove, ...props }) => {
  // DEBUG console.log('OrderItem: row =', row);
  return (
    <>
      <Root>{row.order}</Root>
      <Root>
        <Button data-testid="table-row-action-button" title="Fel" type="button" onClick={() => onMove(row, (row.order || 2) - 1)}>
          <ArrowUp />
        </Button>
      </Root>
      <Root>
        <Button data-testid="table-row-action-button" title="Le" type="button" onClick={() => onMove(row, (row.order || 0) + 1)}>
          <ArrowDown />
        </Button>
      </Root>
    </>
  );
};

export default OrderItem;

OrderItem.propTypes = {
  row: PropTypes.shape().isRequired,
  onMove: PropTypes.func.isRequired,
};

const Root = styled.div`
  display: inline-block;
  width: 2rem;
  text-align: right;
  vertical-align: middle;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0);
  padding: 0;
  min-height: 30px;
  min-width: 30px;
  margin: 0 8px;
`;
