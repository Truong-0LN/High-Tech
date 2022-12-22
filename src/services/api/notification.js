import axiosClient from '../../utils/axiosClient';

export const postDeviceTokenApi = deviceToken => {
  return axiosClient.post('/app-device/', deviceToken);
};

export const getNotificationApi = (page = 1, limit = 20) => {
  return axiosClient.get(`/notification/me/?page=${page}&${limit}`);
};
