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

const getList = async () => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/categories/all`, '', config);
};

const get = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/categories/get`, { id: id }, config);
};

const save = async (request) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/categories/save`, request, config);
};

// const setOrder = async (request) => {
//   addJWT(config);
//   return axios.post(`${baseUrl}/protected/categories/order`, request, config);
// };

const setParent = async (request) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/categories/move`, request, config);
};

const delCat = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/categories/delete`, id, config);
};

const uploadImage = async (image, id, fileName) => {
  addJWT(importConfig);
  const formData = new FormData();
  formData.append('file', image, fileName);
  formData.append('id', id);
  return axios.post(`${baseUrl}/protected/categories/uploadImage`, formData, importConfig);
};

const deleteImage = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/categories/deleteImage`, { id: id }, config);
};

const catServices = {
  getList,
  get,
  save,
  // setOrder,
  setParent,
  delCat,
  uploadImage,
  deleteImage,
};

export default catServices;
