// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Divider, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CustomInput from './CustomInput';
import LowIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MidIcon from '@mui/icons-material/SentimentNeutral';
import HiIcon from '@mui/icons-material/SentimentVerySatisfied';

const ViewDialog = ({ open, handleClose, data, inputs, title, side }) => {
  const { imageUrl, ...rest } = data ? data : {};
  const [state, setState] = useState({ ...rest });

  useEffect(() => {
    if (data) {
      setState({ ...data });
    }
  }, [data]);

  console.log('side', side);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
        <DialogContent>
          <Title>{title}</Title>
          <StyledDivider />
          <Wrappers>
            <WrapperLeft>
              {inputs.map((input) => (
                <CustomInput
                  {...input}
                  variant="outlined"
                  margin="dense"
                  dense
                  fullWidth
                  disabled
                  key={`${title}_${input.id}`}
                  value={state && state[input.id]}
                  defaultChecked={input.type === 'checkbox' ? state && state[input.id] : null}
                />
              ))}
              <Divider style={{ margin: '10px 0' }} />
              {data?.details &&
                Object.keys(data?.details).map((key) => (
                  <table width="100%">
                    <tr>
                      <TH>{key}</TH>
                      <TD>{getIkon(data?.details[key])}</TD>
                    </tr>
                  </table>
                ))}
            </WrapperLeft>
            <WrapperRight>{side && <img src={side} alt="Kép" />}</WrapperRight>
          </Wrappers>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewDialog;

ViewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape()),
  title: PropTypes.string.isRequired,
};

ViewDialog.defaultProps = {
  inputs: [],
};

const Wrappers = styled.div`
  min-width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;

const WrapperLeft = styled.div`
  max-width: 420px;
  min-width: 420px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 8px;
  flex-wrap: wrap;
`;

const WrapperRight = styled(Paper)`
  margin: 16px;
  min-width: calc(50% - 32px);
  & img {
    max-width: 100%;
    max-height: 100%;
  }
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

const getIkon = (value) => {
  switch (value) {
    case 'LOW':
      return <LowIcon fontSize="large" htmlColor="red" />;
    case 'HIGH':
      return <HiIcon fontSize="large" htmlColor="green" />;
    case 'MID':
      return <MidIcon fontSize="large" />;
    default:
      return null;
  }
};

const TH = styled.th`
  text-align: left;
`;

const TD = styled.td`
  text-align: right;
  & svg {
    vertical-align: middle;
  }
`;
