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
  return axios.post(`${baseUrl}/protected/classes/all`, '', config);
};

const save = async (request) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/classes/save`, request, config);
};

const del = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/classes/delete`, id, config);
};

const services = {
  getList,
  save,
  del,
};

export default services;
