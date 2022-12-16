import axiosClient from '../../utils/axiosClient';

export const getMyOrderApi = () => {
  return axiosClient.get('/order/me');
};
export const createOrderApi = data => {
  return axiosClient.post('/order', data);
};
export const getOrderById = _id => {
  return axiosClient.get(`/order/${_id}`);
};
export const getCancleOrder = (_id, data) => {
  return axiosClient.put(`/order/${_id}`, data);
};
export const getCheckCoupon = data => {
  return axiosClient.post('/coupon/check', data);
};
