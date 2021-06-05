import axios from 'axios/index';

const TOKEN_KEY = 'user_token';

export const getAccessToken = () => sessionStorage.getItem(TOKEN_KEY);

const baseUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_URL_PREFIX + '/sensors';

// Get all sensors
export const getSensorList = () =>
  axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });

// Get sensor
export const getSensor = (sensorId) =>
  axios.get(`${baseUrl}/${sensorId}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });

// Delete sensor
export const deleteSensor = (sensorId) =>
  axios.delete(`${baseUrl}/${sensorId}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });

// Update existing sensor
export const updateSensor = (sensorId, data) =>
  axios.put(`${baseUrl}/${sensorId}`, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });

// Create new sensor
export const addSensor = (data) =>
  axios.post(baseUrl, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
