// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const importConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const addJWT = (configObj) => {
  configObj.withCredentials = true;
  configObj.headers.Authorization = `Bearer ${sessionStorage.token}`;
};

const getList = async (filters) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/votes/list`, filters, config);
};

const save = async (request) => {
  addJWT(config);
  return axios.post(
    `${baseUrl}/protected/votes/save`,
    {
      ...request,
      key: undefined,
    },
    config,
  );
};

const uploadImage = async (image, id, fileName) => {
  addJWT(importConfig);
  const formData = new FormData();
  formData.append('file', image, fileName);
  formData.append('id', id);
  return axios.post(`${baseUrl}/protected/votes/uploadImage`, formData, importConfig);
};

const delUser = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/votes/delete`, id, config);
};

const deleteImage = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/votes/deleteImage`, { id: id }, config);
};

const userServices = {
  getList,
  save,
  delUser,
  uploadImage,
  deleteImage,
};

export default userServices;
