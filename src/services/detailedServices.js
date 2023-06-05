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

const addJWT = (configObj) => {
  configObj.withCredentials = true;
  configObj.headers.Authorization = `Bearer ${sessionStorage.token}`;
};

const getList = async () => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/detailed/all`, '', config);
};

const save = async (request) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/detailed/save`, request, config);
};

const del = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/detailed/delete`, { id: id }, config);
};

const setOrder = async (req) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/detailed/setOrder`, req, config);
};

const services = {
  getList,
  save,
  del,
  setOrder,
};

export default services;
