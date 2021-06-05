import axios from 'axios/index';

const baseUrl = process.env.REACT_APP_API_URL;

// Get user
export const getUser = (accessToken) =>
  axios.get(`${baseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

export const performLogin = (formData) => axios.post(`${baseUrl}/auth/login`, formData);
