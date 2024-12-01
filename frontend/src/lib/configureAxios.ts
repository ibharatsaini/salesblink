
import axios from 'axios';


const BASE_URL = process.env.ENV == 'production' ?  process.env.BACKEND_URL : 'http://localhost:8080/'

const axiosInstance = axios.create({
  baseURL: BASE_URL , 
  withCredentials: true
});

axiosInstance.defaults.withCredentials = true

export default axiosInstance;
