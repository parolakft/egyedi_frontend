// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Chip } from '@mui/material';
import { Table } from 'parola-table';
import Box from './Box';
import ViewDialog from './ViewDialog';
import PropTypes from 'prop-types';
import VoteFilters from './VoteFilters';
import ProductIcon from '@mui/icons-material/Fastfood';
import LowIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MidIcon from '@mui/icons-material/SentimentNeutral';
import HiIcon from '@mui/icons-material/SentimentVerySatisfied';

const VotesList = ({ data, getData, filters, setFilters, mode, showError, ...props }) => {
  const [diagData, setDiagData] = useState(null);
  const [openEditDiag, setOpenEditDiag] = useState(false);

  const inputs = [
    { id: 'itemName', name: 'itemName', label: 'Termék', disabled: true },
    { id: 'userName', name: 'userName', label: 'Felhasználó', disabled: true },
    { id: 'created', name: 'created', label: 'Időpont', type: 'datetime' },
    {
      id: 'value',
      name: 'value',
      label: 'Szavazat',
      disabled: true,
      select: true,
      selectItems: [
        { id: 'HIGH', name: <HiIcon fontSize="large" htmlColor="green" /> },
        { id: 'MID', name: <MidIcon fontSize="large" /> },
        { id: 'LOW', name: <LowIcon fontSize="large" htmlColor="red" /> },
      ],
    },
    { id: 'divider', divider: true },
    { id: 'review', name: 'review', label: 'Szöveges értékelés', disabled: true, multiline: true },
  ];

  const getTitle = () => {
    switch (mode) {
      case 'user':
        return 'Felhasználó aktivitása';
      case 'item':
        return 'Termékre leadott értékelések';
      default:
        return null;
    }
  };

  const handleClick = (row) => {
    setDiagData(row);
    setOpenEditDiag(true);
  };

  const columns = [
    { headerFor: 'itemName', title: 'Termék', component: (row) => <ItemChip row={row} /> },
    { headerFor: 'userName', title: 'Felhasználó', component: (row) => <UserChip row={row} /> },
    { headerFor: 'vote', title: 'Értékelés', component: (row) => <VoteChip vote={row} handleClick={handleClick} />, width: '250px', align: 'center' },
    { headerFor: 'created', title: 'Időpont', component: (row) => row.created.replace('T', ' ').substr(0, 16), width: '150px' },
  ];

  return (
    <Box title={getTitle()} min="100%" controls={<VoteFilters filters={filters} setFilters={setFilters} refresh={getData} mode={mode} />}>
      <ViewDialog
        title={`Értékelés részletei - ${diagData?.id}`}
        open={openEditDiag}
        handleClose={() => setOpenEditDiag(false)}
        data={diagData}
        inputs={inputs}
        side={diagData?.hasImage ? `${process.env.REACT_APP_API_URL}/images/votes/${diagData.id}` : undefined}
      />

      <div>
        <Table data={data || []} columns={columns} headerBg="#def3ff" height="calc(100vh - 14rem)" striped stickyHeader />
      </div>
    </Box>
  );
};

export default VotesList;

VotesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getData: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  showError: PropTypes.func.isRequired,
  name: PropTypes.string,
};

const RoundedChip = styled(Chip)`
  width: 100%;
  border-radius: 7px !important;
`;

const ItemChip = ({ row }) => (
  <RoundedChip
    color="primary"
    variant="outlined"
    avatar={
      <Avatar variant="rounded" src={row?.itemHasImage ? `${process.env.REACT_APP_API_URL}/images/items/${row?.itemId}` : undefined}>
        <ProductIcon />
      </Avatar>
    }
    label={row?.itemName}
  />
);

const UserChip = ({ row }) => (
  <RoundedChip
    color="primary"
    variant="outlined"
    avatar={<Avatar src={row?.userHasImage ? `${process.env.REACT_APP_API_URL}/images/profiles/${row?.userId}` : undefined} />}
    label={row?.userName}
  />
);

const getIkon = (value) => {
  switch (value) {
    case 'LOW':
      return <LowIcon fontSize="large" />;
    case 'HIGH':
      return <HiIcon fontSize="large" />;
    case 'MID':
      return <MidIcon fontSize="large" />;
    default:
      return null;
  }
};

const getKolor = (value) => {
  switch (value) {
    case 'LOW':
      return 'error';
    case 'HIGH':
      return 'success';
    case 'MID':
    default:
      return 'default';
  }
};

const VoteChip = ({ vote, handleClick }) => {
  const ikon = getIkon(vote.value);
  const kolor = getKolor(vote.value);
  const label = [];
  if (vote?.review) label.push('Szöveg');
  if (Object.keys(vote?.details).length) label.push('Részletes');
  if (vote?.hasImage) label.push('Kép');
  const empty = label.length === 0;
  return (
    <RoundedChip
      variant={vote?.value === 'UNKNOWN' ? 'outlined' : 'filled'}
      icon={ikon}
      color={kolor}
      label={empty ? '-' : label.join(', ')}
      clickable={!empty}
      onClick={(e) => handleClick(vote)}
    />
  );
};
