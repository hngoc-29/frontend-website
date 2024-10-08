import axios from 'axios';
import {
  jwtDecode as jwt_decode
} from 'jwt-decode';
import axiosReq from './axios.req'
export const URL = 'http://localhost:8080';
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: URL,
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
// Add a request interceptor
instance.interceptors.request.use(async function (config) {
  // Do something before request is sent
  //axiosReq.refreshToken();
  const rftoken = document.cookie?.split('=')[0];
  let access_token = localStorage.getItem('access_token') || null;
  if (rftoken === 'refresh_token' && access_token) {
    let date = new Date();
    try {
      const decodeToken = jwt_decode(access_token);
      if (decodeToken.exp < date.getTime()/1000) {
        const res = await axiosReq.refreshToken();
        access_token = res?.data?.access_token;
        localStorage.setItem('access_token', access_token)
      };
    } catch(err) {
      localStorage.removeItem('access_token')
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      return err
    }
  } else {
    localStorage.removeItem('access_token')
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    return;
  }
  config.headers.Authorization = `Bearer ${access_token}`;
  return config;

},
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
},
  function (error) {
    return Promise.reject(error);
  });

export default instance;