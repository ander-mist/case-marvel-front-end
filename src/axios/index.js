import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('token'));
  const token = auth ? auth.token : false;
  try {
    if (auth) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token;
    }
    return config;
  } catch (_err) {
    return null;
  }
});

export default api;
