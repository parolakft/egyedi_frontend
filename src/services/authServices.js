// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import axios from 'axios';

const jsonwebtoken = require('jsonwebtoken');

const baseUrl = process.env.REACT_APP_API_URL;
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const resendMail = async (email) => {
  return axios.post(`${baseUrl}/auth/resendLink`, { email: email });
};

const loginUser = async (request) => {
  return axios.post(`${baseUrl}/auth/login2`, request);
};

const confirmUser = async (request) => {
  return axios.post(`${baseUrl}/auth/confirm`, request);
};

const requestNewPassword = (request) => {
  return axios.post(`${baseUrl}/auth/lostPassword`, request, config);
};

const resetPassword = async (request) => {
  return axios.post(`${baseUrl}/auth/reset`, request);
};

const logoutUser = () => {
  sessionStorage.removeItem('user');
  return sessionStorage.removeItem('token');
};

const verifyToken = () => {
  // console.log("verify token:",sessionStorage.getItem('token'));
  const token = sessionStorage.getItem('token');
  if (!token) return false;
  try {
    const verify = jsonwebtoken.decode(token, { complete: true });
    //  console.log("verify :",verify);
    return verify;
  } catch (error) {
    console.error(error);
    return 'EXPIRED';
  }
};

const authServices = {
  verifyToken,
  loginUser,
  confirmUser,
  logoutUser,
  requestNewPassword,
  resetPassword,
  resendMail,
};

export default authServices;
