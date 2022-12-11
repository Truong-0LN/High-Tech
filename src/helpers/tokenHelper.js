import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.log('token error ', error);
  }
};

export const setToken = async token => {
  await AsyncStorage.setItem('token', token);
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log('token error ', error);
  }
};
