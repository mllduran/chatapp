import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://18.141.185.234'
});

export default instance;