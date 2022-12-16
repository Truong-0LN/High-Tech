import axiosClient from '../../utils/axiosClient';

export const getAllBrandApi = () => {
  return axiosClient.get('/brand/');
};
