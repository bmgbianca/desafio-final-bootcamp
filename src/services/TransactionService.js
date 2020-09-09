import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3001/',
  headers: {
    'Content-type': 'application/json',
  },
});

const create = (data) => {
  return http.post('/api/transaction', data);
};

const list = (period) => {
  return http.get(`/api/transaction?period=${period}`);
};

const selectOne = (id) => {
  return http.get(`/api/transaction/${id}`);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

const update = (id, data) => {
  return http.put(`/api/transaction/${id}`, data);
};

export default { create, list, remove, update, selectOne };
