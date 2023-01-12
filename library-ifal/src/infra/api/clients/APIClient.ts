import axios from 'axios';

export const APIClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});
