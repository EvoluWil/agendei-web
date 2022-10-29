import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://agendei-api.vercel.app/v1'
  // baseURL: 'http://localhost:3001/v1'
});
