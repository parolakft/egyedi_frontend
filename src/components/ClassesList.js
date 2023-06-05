// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import { Table } from 'parola-table';
import Box from './Box';
import EditDialog from './EditDialog';
import { ReFreshBtn } from './Button';
import PropTypes from 'prop-types';

const ClassesList = ({ data, saveData, delData, getData, showError, ...props }) => {
  const [diagData, setDiagData] = useState(null);
  const [openEditDiag, setOpenEditDiag] = useState(false);

  const inputs = [
    { id: 'name', name: 'name', label: 'Név', required: true },
    {
      id: 'type',
      name: 'type',
      label: 'Típus',
      required: true,
      select: true,
      selectItems: [
        { id: '1', name: 'Végfelhasználó' },
        { id: '2', name: 'Külső bolt' },
        { id: '3', name: 'Üzemvezető' },
        { id: '4', name: 'Saját bolt' },
        { id: '8', name: 'Admin' },
        { id: '9', name: 'Fejlesztő' },
      ],
    },
    { id: 'priority', name: 'priority', label: 'Prioritás', type: 'integer' },
    { id: 'voteCount', name: 'voteCount', label: 'Napi szavazati limit', type: 'integer' },
  ];

  const editComponents = {
    onEdit: {
      callBack: (rowData) => {
        console.log('edit', rowData);
        setDiagData(rowData);
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
        if (window.confirm(`Biztosan ${rowData.deleted ? 'vissza akarja állítani' : 'törölni akarja'} a csoportot:\r\n${rowData.name}`)) {
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
    saveData(data);
    // Dialógus bezárása
    setOpenEditDiag(false);
  };

  return (
    <Box title="Felhasználói csoportok" min="100%" controls={<ReFreshBtn callback={getData} />}>
      <EditDialog
        title={`Felhasználó csoport szerkesztése - ${diagData?.id ?? 'ÚJ'}`}
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

export default ClassesList;

ClassesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveData: PropTypes.func.isRequired,
  delData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
};

const columns = [
  { headerFor: 'name', title: 'Név' },
  { headerFor: 'type', title: 'Típus' },
  { headerFor: 'priority', title: 'Prioritás' },
  { headerFor: 'voteCount', title: 'Napi szavazati limit' },
];
