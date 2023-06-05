// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import { Avatar, Chip } from '@mui/material';
import ProductIcon from '@mui/icons-material/Fastfood';
import { Table } from 'parola-table';
import Box from './Box';
import EditDialog from './EditDialog';
import ImageUploadDialog from './UploadDialog';
import { ReFreshBtn } from './Button';
import PropTypes from 'prop-types';
import catsServices from '../services/categoryServices';
//import styled from 'styled-components';

const CategoriesList = ({ data, saveData, delData, getData, cats, showError, ...props }) => {
  const [diagData, setDiagData] = useState(null);
  const [openEditDiag, setOpenEditDiag] = useState(false);
  const [dlgData, setDlgData] = useState([]);
  const [showDlg, setShowDlg] = useState(false);

  console.log('data', data, 'cats', cats);

  const inputs = [
    { id: 'name', name: 'name', label: 'Megnevezés', required: true },
    { id: 'div1', divider: true },
    {
      id: 'parentId',
      name: 'parentId',
      label: 'Szülőkategória',
      select: true,
      selectItems: [{ name: '- Nincs szülő -' }, ...cats],
    },
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
        if (window.confirm(`Biztosan ${rowData.deleted ? 'vissza akarja állítani' : 'törölni akarja'} a kategóriát:\r\n${rowData.name}`)) {
          delData(rowData.id);
        }
      },
    },
  };

  const handleEditItem = (data) => {
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

  const columns = [
    {
      headerFor: 'hasImage',
      title: 'Kép',
      component: (row) => (
        <Avatar
          variant="rounded"
          src={row.hasImage ? `${process.env.REACT_APP_API_URL}/images/cats/${row.id}` : undefined}
          style={{ cursor: 'pointer' }}
          onClick={(event) => imgDlg(row)}>
          <ProductIcon />
        </Avatar>
      ),
      width: '70px',
    },
    { headerFor: 'name', title: 'Megnevezés' },
    {
      headerFor: 'parentId',
      title: 'Szülő',
      component: (row) => (row.parentId ? <Chip size="small" variant="outlined" label={data.find((cat) => cat.id === row.parentId)?.name} /> : ''),
      width: '100px',
    },
    {
      headerFor: 'childCount',
      title: 'Alkategóriák',
      component: (row) => <Chip color="info" variant={row.childCount > 0 ? 'filled' : 'outlined'} label={row.childCount} />,
      width: '100px',
    },
    {
      headerFor: 'itemCount',
      title: 'Cikkek',
      component: (row) => <Chip color="secondary" variant={row.itemCount > 0 ? 'filled' : 'outlined'} label={row.itemCount} />,
      width: '100px',
    },
  ];

  const imgDlg = (row) => {
    console.log('show image dialog for category', row.id);
    const data = { ...row };
    delete data.actions;
    delete data.index;
    setDlgData(data);
    setShowDlg(true);
  };

  const uploadImage = async (image, id, imageName) => {
    try {
      const response = await catsServices.uploadImage(image, id, imageName);
      console.log(response);

      if (response?.data?.status !== 'OK') {
        showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
        return;
      }
      showError('success', 'Siker!', 'Képfájl feltöltve.');
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  const deleteImage = async (id) => {
    try {
      const response = await catsServices.deleteImage(id);
      console.log(response);

      if (response?.data?.status !== 'OK') {
        showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
        return;
      }
      showError('success', 'Siker!', 'Képfájl törölve.');
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  return (
    <Box title="Kategóriák" min="100%" controls={<ReFreshBtn callback={getData} />}>
      <EditDialog
        title={`Kategória szerkesztése - ${diagData?.id ?? 'ÚJ'}`}
        open={openEditDiag}
        handleClose={() => setOpenEditDiag(false)}
        data={diagData}
        onSubmit={handleEditItem}
        inputs={inputs}
      />
      <ImageUploadDialog
        title={`Kép - ${dlgData.name}`}
        open={showDlg}
        handleClose={() => {
          setShowDlg(false);
          getData();
        }}
        data={dlgData}
        onImageSubmit={uploadImage}
        deleteImage={deleteImage}
        kind="cats"
        showError={showError}
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

export default CategoriesList;

CategoriesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveData: PropTypes.func.isRequired,
  delData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  cats: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  showError: PropTypes.func.isRequired,
};
