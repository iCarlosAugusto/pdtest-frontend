import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'http://ec2-3-83-103-75.compute-1.amazonaws.com:3000', // Insira a sua baseURL aqui
});

export default axiosRequest;
