import axiosClient from '../../utils/axiosClient';

export const getBannerApi = () => {
  return axiosClient.get('/banner/');
};

export const getOneBannerApi = id => {
  return axiosClient.get(`/banner/${id}`);
};
