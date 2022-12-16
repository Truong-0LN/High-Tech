import axiosClient from '../../utils/axiosClient';

export const getAllCategoriesApi = () => {
  return axiosClient.get(`/category/`);
};
