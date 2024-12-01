
import axios from 'axios';

// console.log(process.env)
const BASE_URL = `https://web-a5hu325dvog2.up-de-fra1-k8s-1.apps.run-on-seenode.com/`
console.log(BASE_URL)
const axiosInstance = axios.create({
  baseURL: BASE_URL , 
  withCredentials: true
});

axiosInstance.defaults.withCredentials = true

export default axiosInstance;
