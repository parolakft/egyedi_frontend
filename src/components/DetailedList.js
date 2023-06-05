// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import styled from 'styled-components';
import { Chip } from '@mui/material';
import LowIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MidIcon from '@mui/icons-material/SentimentNeutral';
import HiIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Table } from 'parola-table';
import Box from './Box';
import EditDialog from './EditDialog';
import { ReFreshBtn } from './Button';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

const DetailedList = ({ data, saveData, delData, getData, showError, onMove, ...props }) => {
  const [diagData, setDiagData] = useState(null);
  const [openEditDiag, setOpenEditDiag] = useState(false);

  const inputs = [
    { id: 'detail', name: 'detail', label: 'Megnevezés', required: true },
    {
      id: 'defaultValue',
      name: 'defaultValue',
      label: 'Default érték',
      required: true,
      select: true,
      selectItems: [
        { id: 'HIGH', name: <HiIcon fontSize="large" htmlColor="green" /> },
        { id: 'MID', name: <MidIcon fontSize="large" /> },
        { id: 'LOW', name: <LowIcon fontSize="large" htmlColor="red" /> },
      ],
    },
    { id: 'divider', divider: true },
    {
      id: 'active',
      name: 'active',
      label: 'Szempont állapota',
      required: true,
      select: true,
      selectItems: [
        { id: true, name: 'Aktív' },
        { id: false, name: 'Inaktív' },
      ],
    },
  ];

  const editComponents = {
    onEdit: {
      callBack: (rowData) => {
        console.log('edit', rowData);
        console.log('type of active', typeof rowData.active);
        setDiagData({ ...rowData, active: '' + rowData.active });
        setOpenEditDiag(true);
      },
    },
    onAdd: {
      callBack: () => {
        console.log('add');
        setDiagData({});
        setOpenEditDiag(true);
      },
    },
    onDelete: {
      callBack: (rowData) => {
        console.log('delete', rowData);
        if (window.confirm(`Biztosan ${rowData.deleted ? 'vissza akarja állítani' : 'törölni akarja'} a szempontot:\r\n${rowData.detail}`)) {
          delData(rowData.id);
        }
      },
    },
  };

  const handleEditClass = (data) => {
    // // Validálás
    // const required = ['email', 'name'];
    // const hasErrors = validateForm(data, required);
    // if (hasErrors) {
    //   showError('error', '', 'Kérjük minden kötelező mezőt töltsön ki');
    //   return;
    // }
    // Letárolás
    console.log('type of active', typeof data.active, data.active);
    saveData(data);
    // Dialógus bezárása
    setOpenEditDiag(false);
  };

  const columns = [
    { headerFor: 'detail', title: 'Megnevezés', required: true, component: (row) => <DetailChip row={row} />, unsorted: true },
    { headerFor: 'defaultValue', title: 'Default érték', width: 120, component: getIkon, unsorted: true },
    { headerFor: 'order', title: 'Sorrend', width: 160, component: (row) => <OrderItem row={row} onMove={onMove} />, unsorted: true },
  ];

  return (
    <Box title="Részletes értékelés szempontjai" min="100%" controls={<ReFreshBtn callback={getData} />}>
      <EditDialog
        title={`Szempont szerkesztése - ${diagData?.id ?? 'ÚJ'}`}
        open={openEditDiag}
        handleClose={() => setOpenEditDiag(false)}
        data={diagData}
        onSubmit={handleEditClass}
        inputs={inputs}
      />

      <div>
        <Table
          data={data || []}
          columns={columns}
          headerBg="#def3ff"
          height="calc(100vh - 14rem)"
          editable
          striped
          editComponents={editComponents}
          stickyHeader
        />
      </div>
    </Box>
  );
};

export default DetailedList;

DetailedList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveData: PropTypes.func.isRequired,
  delData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

const getIkon = (row) => {
  switch (row.defaultValue) {
    case 'LOW':
      return <LowIcon fontSize="large" htmlColor="red" />;
    case 'HIGH':
      return <HiIcon fontSize="large" htmlColor="green" />;
    case 'MID':
    default:
      return <MidIcon fontSize="large" />;
  }
};

const RoundedChip = styled(Chip)`
  width: 100%;
  border-radius: 3px !important;
  text-align: left;
`;

const DetailChip = ({ row }) => (
  <RoundedChip color={row.active ? 'primary' : 'default'} label={row.detail} title={row.active ? '' : 'Inaktív'} variant="outlined" />
);
