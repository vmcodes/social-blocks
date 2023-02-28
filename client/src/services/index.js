import axios from 'axios';

const API_URL = window.location.origin.includes('3000')
  ? 'http://localhost:8000'
  : window.location.origin;

const accessToken = localStorage?.getItem('x-social-blocks');

export const socialApi = axios.create({
  baseURL: API_URL,
  headers: {
    'content-Type': 'application/json',
    authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

export const loginUser = async (address) => {
  return (await socialApi.post(`/user`, { address: address })).data;
};

export const getAccount = async (address) => {
  return (await socialApi.post(`/profile`, { address: address })).data;
};

export const getProfile = async (slug) => {
  return (await socialApi.get(`/profile/${slug}`)).data;
};

export const createProfile = async (address) => {
  return (await socialApi.put(`/profile`, { address: address })).data;
};

export const updateProfile = async (profile) => {
  return (await socialApi.patch(`/profile`, profile)).data;
};
