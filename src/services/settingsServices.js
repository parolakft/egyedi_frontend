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

const list = async () => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/settings/all`, "", config);
};

const get = async (name) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/settings/get`, { name: name }, config);
};

const save = async (request) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/settings/save`, request, config);
};

const del = async (id) => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/settings/delete`, id, config);
};

const sync = async () => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/settings/synchronize`, "", config);
};

const syncLog = async () => {
  addJWT(config);
  return axios.post(`${baseUrl}/protected/settings/syncStatus`, "", config);
};

const services = {
  list,
  get,
  save,
  del,
  sync,
  syncLog,
};

export default services;
