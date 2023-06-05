import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Chip } from '@mui/material';
import { Table } from 'parola-table';
import Box from './Box';
import EditDialog from './EditDialog';
import UserFilters from './UserFilters';
import PropTypes from 'prop-types';
import authServices from '../services/authServices';

const UsersList = ({ data, saveData, delData, getData, filters, setFilters, classes, showError, ...props }) => {
  const [diagData, setDiagData] = useState(null);
  const [openEditDiag, setOpenEditDiag] = useState(false);

  const history = useHistory();
  const inputs = [
    { id: 'email', name: 'email', label: 'E-mailcím', required: true },
    {
      id: 'password',
      name: 'password',
      label: 'Jelszó',
      required: !diagData?.id,
      // XY-1041 Jelszó mező titkosítása
      type: 'password',
    },
    { id: 'name', name: 'name', label: 'Név', required: true },
    { id: 'birthdate', name: 'birthdate', label: 'Születési dátum', type: 'date' },
    {
      id: 'gender',
      name: 'gender',
      label: 'Nem',
      select: true,
      selectItems: [
        { id: 'UNSPECIFIED', name: 'Nem megadott' },
        { id: 'MALE', name: 'Férfi' },
        { id: 'FEMALE', name: 'Nő' },
      ],
    },
    { id: 'divider', divider: true },
    {
      id: 'classes',
      name: 'classes',
      label: 'Szerepkörök',
      required: true,
      multiple: true,
      selectItems: classes,
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
        if (window.confirm(`Biztosan ${rowData.active ? 'de' : ''}aktiválni akarja a felhasználót:\r\n${rowData.email}`)) {
          delData(rowData.id);
        }
      },
    },
  };

  const handleEditUser = (data) => {
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

  const handleVotesClick = (row) => {
    history.push(`/users/votes/${row.id}`);
  };

  const columns = [
    {
      headerFor: 'name',
      title: 'Név',
      component: (row) => <UserChip user={row} />,
    },
    { headerFor: 'email', title: 'E-mail' },
    {
      headerFor: 'classes',
      title: 'Szerepkörök',
      component: (row) =>
        row.classes.map((clas) => {
          return <Chip size="small" variant="outlined" label={clas.name} />;
        }),
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

  return (
    <Box title="Felhasználók" min="100%" controls={<UserFilters filters={filters} setFilters={setFilters} refresh={getData} />}>
      <EditDialog
        title={`Felhasználó szerkesztése - ${diagData?.id ?? 'ÚJ'}`}
        open={openEditDiag}
        handleClose={() => setOpenEditDiag(false)}
        data={diagData}
        onSubmit={handleEditUser}
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

export default UsersList;

UsersList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveData: PropTypes.func.isRequired,
  delData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
};

const RoundedChip = styled(Chip)`
  width: 100%;
  border-radius: 7px !important;
`;

const UserChip = ({ user }) => (
  <RoundedChip
    key={user.id}
    variant={user.token ? 'filled' : 'outlined'}
    color={user.active ? 'primary' : 'default'}
    avatar={<Avatar src={user.hasImage ? `${process.env.REACT_APP_API_URL}/images/profiles/${user.id}` : undefined} />}
    label={user.name}
    clickable={user.token && true}
    onClick={user.token ? () => authServices.resendMail(user.email) : null}
    title={user.token ? 'Levél újraküldése' : ''}
  />
);
