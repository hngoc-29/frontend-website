import axiosJWT from './axios.customize';
import axios from 'axios';
import {
  URL
} from './axios.customize';
const axiosJWTRequest = {
  //Register
  register: async(user_data) => {
    const path = '/v1/api/user/register';
    return await axios.post(URL+path, user_data);
  },
  login: async(user_data) => {
    const path = '/v1/api/user/login';
    return await axios.post(URL+path, user_data, {
      withCredentials: true
    });
  },
  getInfoUser: async () => {
    const path = '/v1/api/user/user';
    return await axiosJWT.post(URL+path)
  },
  refreshToken: async () => {
    const path = '/v1/api/user/refresh';
    return await axios.post(URL+path, {}, {
      withCredentials: true
    })
  },
  //logout
  logout: async(id) => {
    const path = '/v1/api/user/logout';
    return await axiosJWT.post(`${path}/${id}`, {}, {
      withCredentials: true
    })
  },
}
export default axiosJWTRequest;