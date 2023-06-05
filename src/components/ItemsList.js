// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Chip } from '@mui/material';
import ProductIcon from '@mui/icons-material/Fastfood';
import { Table } from 'parola-table';
import Box from './Box';
import EditDialog from './EditDialog';
import ImageUploadDialog from './UploadDialog';
import ItemFilters from './ItemFilters';
import PropTypes from 'prop-types';
import itemServices from '../services/itemServices';

const ItemsList = ({ data, saveData, delData, getData, filters, setFilters, cats, showError, ...props }) => {
  const [diagData, setDiagData] = useState(null);
  const [openEditDiag, setOpenEditDiag] = useState(false);
  const [dlgData, setDlgData] = useState([]);
  const [showDlg, setShowDlg] = useState(false);
  const history = useHistory();
  const inputs = [
    { id: 'code', name: 'code', label: 'Cikkód', disabled: true },
    { id: 'parman', name: 'parman', label: 'parMAN egyedi azonosító', disabled: true },
    { id: 'name', name: 'name', label: 'Megnevezés', disabled: true },
    { id: 'shortName', name: 'shortName', label: 'Rövid név', disabled: true },
    { id: 'description', name: 'description', label: 'Leírás', disabled: true, multiline: true },
    { id: 'rating', name: 'rating', label: 'Átlagos értékelés', disabled: true },
    { id: 'nuts', name: 'nuts', label: 'Tápértékek', disabled: true, multiline: true },
    { id: 'alls', name: 'alls', label: 'Allergének', disabled: true, multiline: true },
    { id: 'div1', divider: true },
    { id: 'subtitle', name: 'subtitle', label: 'Alcím' },
    {
      id: 'categoryId',
      name: 'categoryId',
      label: 'Kategória',
      required: true,
      select: true,
      selectItems: [{ name: 'Kategorizálatlan' }, ...cats],
    },
  ];

  const editComponents = {
    onEdit: {
      callBack: (rowData) => {
        // console.log('edit', rowData);
        rowData.alls = rowData.allergens.filter((a) => 'YES' === a.info).map((a) => a.allergen.name);
        rowData.nuts = rowData.nutritions.map((a) => a.detail.fullName + ': ' + a.value);
        setDiagData(rowData);
        setOpenEditDiag(true);
      },
    },
    // onAdd: { callBack: () => { console.log('add'); setDiagData({}); setOpenEditDiag(true); }, },
    // onDelete: { callBack: (rowData) => { console.log('delete', rowData);
    // if (window.confirm(`Biztosan törölni akarja a felhasználót:\r\n${rowData.email}`)) { delData(rowData.id); } }, },
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
    delete data.alls;
    delete data.nuts;
    saveData(data);
    // Dialógus bezárása
    setOpenEditDiag(false);
  };

  const handleVotesClick = (row) => {
    history.push(`/products/votes/${row.id}`);
  };

  const columns = [
    { headerFor: 'code', title: 'Cikkszám', width: '100px' },
    {
      headerFor: 'hasImage',
      title: 'Kép',
      component: (row) => (
        <Avatar
          variant="rounded"
          src={row.hasImage ? `${process.env.REACT_APP_API_URL}/images/items/${row.id}` : undefined}
          style={{ cursor: 'pointer' }}
          onClick={(event) => imgDlg(row)}>
          <ProductIcon />
        </Avatar>
      ),
      width: '70px',
    },
    {
      headerFor: 'name',
      title: 'Megnevezés',
      component: (row) => <ItemChip item={row} />,
      width: '500px',
    },
    {
      headerFor: 'categoryId',
      title: 'Kategória',
      component: (row) =>
        row.categoryId ? <Chip size="small" variant="outlined" label={cats.find((cat) => cat.id === row.categoryId)?.name} /> : '',
      width: '150px',
      unsorted: true,
    },
    {
      headerFor: 'ingredients',
      title: 'Összetevők',
      unsorted: true,
      component: (row) => <WideChip size="small" variant="outlined" label={(row.ingredients || '').substr(0, 70) + '...'} />,
      width: '500px',
    },
    {
      headerFor: 'votes',
      title: 'Értékelések',
      component: (row) => (
        <RoundedChip
          color={row.votes ? 'primary' : 'default'}
          variant={row.votes ? 'filled' : 'outlined'}
          label={row.votes}
          clickable={!!row.votes}
          onClick={() => (row.votes ? handleVotesClick(row) : false)}
        />
      ),
      width: 120,
    },
  ];

  const imgDlg = (row) => {
    console.log('show image dialog for product', row.id);
    const data = { ...row };
    delete data.actions;
    delete data.index;
    setDlgData(data);
    setShowDlg(true);
  };

  const uploadImage = async (image, id, imageName) => {
    try {
      const response = await itemServices.uploadImage(image, id, imageName);
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
      const response = await itemServices.deleteImage(id);
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
    <Box title="Termékek" min="100%" controls={<ItemFilters filters={filters} setFilters={setFilters} refresh={getData} cats={cats} />}>
      <EditDialog
        title={`Termék szerkesztése - ${diagData?.id ?? 'ÚJ'}`}
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
        kind="items"
        showError={showError}
      />
      <div>
        <Table
          data={data}
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

export default ItemsList;

ItemsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveData: PropTypes.func.isRequired,
  delData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  cats: PropTypes.array.isRequired,
  showError: PropTypes.func.isRequired,
};

const WideChip = styled(Chip)`
  width: 100%;
`;
const RoundedChip = styled(WideChip)`
  border-radius: 7px !important;
`;

const ItemChip = ({ item }) => <RoundedChip key={item.id} color={item.deleted ? 'default' : 'primary'} label={item.name} title={item.shortName} />;
