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

const SettingsList = ({ data, saveData, delData, getData, showError, ...props }) => {
  const [diagData, setDiagData] = useState(null);
  const [openEditDiag, setOpenEditDiag] = useState(false);

  const inputs = [
    { id: 'name', name: 'name', label: 'Megnevezés', required: true },
    { id: 'value', name: 'value', label: 'Érték', required: true, multiline: true },
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
        if (window.confirm(`Biztosan ${rowData.deleted ? 'vissza akarja állítani' : 'törölni akarja'} a beállítást:\r\n${rowData.name}`)) {
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
    <Box title="Rendszerszintű beállítások" min="100%" controls={<ReFreshBtn callback={getData} />}>
      <EditDialog
        title={`Beállítás szerkesztése - ${diagData?.id ?? 'ÚJ'}`}
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

export default SettingsList;

SettingsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveData: PropTypes.func.isRequired,
  delData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
};

const columns = [
  { headerFor: 'name', title: 'Megnevezés' },
  { headerFor: 'value', title: 'Érték', unsorted: true },
];
