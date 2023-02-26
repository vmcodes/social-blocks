import axios from 'axios';

const API_URL = window.location.origin.includes('8000')
  ? 'http://localhost:3000'
  : window.location.origin;

const accessToken = localStorage?.getItem('x-social-blocks');

export const socialApi = axios.create({
  baseURL: API_URL,
  headers: {
    'content-Type': 'application/json',
    authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

export const loginUser = async (did) => {
  return (await socialApi.post(`/user`, { did: did })).data;
};

export const getProfile = async () => {
  return (await socialApi.get(`/profile`)).data;
};

export const createProfile = async (did) => {
  return (await socialApi.put(`/profile`, { did: did })).data;
};

export const updateProfile = async (profile) => {
  return (await socialApi.post(`/profile`, profile)).data;
};
