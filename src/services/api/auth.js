import axiosClient from '../../utils/axiosClient';

export const loginRequestApi = data => {
  return axiosClient.post('/access/login', data);
};
export const regsiterRequestApi = data => {
  return axiosClient.post('/access/register', data);
};
export const changePasswordApi = data => {
  return axiosClient.put('/access/change-password', data);
};
export const forgotPasswordApi = data => {
  return axiosClient.post('/access/forgot-password', data);
};

export const veryfiCodedApi = data => {
  return axiosClient.post('/access/verify-code', data);
};
export const resetPassworddApi = data => {
  return axiosClient.post('/access/reset-password', data);
};
export const updateProfileApi = (data, header) => {
  return axiosClient.put('/access/me', data,header);
};
export const getUserInfoApi = () => {
  return axiosClient.get('/access/me');
};
