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
  return axios.post(`${baseUrl}/protected/items/list`, filters, config);
};

const save = async (request) => {
  addJWT(config);
  return axios.post(
    `${baseUrl}/protected/items/save`,
    {
      ...request,
      key: undefined,
    },
    config,
  );
};

const delItem = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/items/delete`, id, config);
};

const uploadImage = async (image, id, fileName) => {
  addJWT(importConfig);
  const formData = new FormData();
  formData.append('file', image, fileName);
  formData.append('id', id);
  return axios.post(`${baseUrl}/protected/items/uploadImage`, formData, importConfig);
};

const deleteImage = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/items/deleteImage`, { id: id }, config);
};

const itemServices = {
  getList,
  save,
  delItem,
  uploadImage,
  deleteImage,
};

export default itemServices;
