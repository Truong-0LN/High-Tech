import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {getToken} from '../helpers/tokenHelper';
// let token;
// getToken().then(res => {
//   token = res;
// });

const axiosClient = axios.create({
  baseURL: 'http://quyt.ddns.net:3000',
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    config.headers = {
      'x-access-token': `${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  err => Promise.reject(err),
);

axiosClient.interceptors.response.use(
  res => res.data,
  err => {
    if(err.status === 503){
      showModal({
        title: 'Đăng nhập thất bại',
        message: 'Sự cố hệ thống',
      });
    }
    return Promise.reject(err);
  },
);

export default axiosClient;
