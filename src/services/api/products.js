import axiosClient from '../../utils/axiosClient';
export const getAllProductsApi = (page = 1, limit = 30) => {
  return axiosClient.get(`/product?page=${page}&limit=${limit}`);
};
export const getProductApi = id => {
  return axiosClient.get(`/product/${id}`);
};
export const getAllProductsByTypeApi = type => {
  return axiosClient.get(`/product?populate=category&type=${type}`);
};
export const getMyFavoriteApi = () => {
  return axiosClient.get('/favorite/me');
};
export const getCheckFavoriteApi = id => {
  return axiosClient.get(`/favorite/check/${id}`);
};
export const changeFavoriteApi = data => {
  return axiosClient.post('/favorite', data);
};

export const getProductByTitleApi = title => {
  return axiosClient.get(`/product?title=/${title}/i`);
};

export const getProductByFilter = (
  _brand,
  _minSalePrice,
  _maxSalePrice,
  _sort,
) => {
  return axiosClient.get(
    `/product/?brands=${_brand}&salePrice>=${_minSalePrice}&salePrice<=${_maxSalePrice}&sort=${_sort}`,
  );
};
