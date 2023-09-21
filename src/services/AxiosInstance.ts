import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL:"https://api.themoviedb.org/"
});

export default AxiosInstance;
