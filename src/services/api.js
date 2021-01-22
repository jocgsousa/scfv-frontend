import axios from 'axios';

const api = axios.create({
  baseURL: 'http://26.159.182.253:3020',
});

export default api;
