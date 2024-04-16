import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'http://localhost:3000', // Insira a sua baseURL aqui
});

export default axiosRequest;
