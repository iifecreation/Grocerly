import { API_ROUTES } from '@/contants/api-routes';
import axiosInstance from './config';
import { showMessage } from 'react-native-flash-message';
import { NOTIFICATIONS_ACTION, NOTIFICATIONS_RESPONSE } from '@/contants';

export const loginAPI = async (data) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, data);
    showMessage({
      message: NOTIFICATIONS_RESPONSE.SUCCESS,
      description: response?.data?.message,
      type: NOTIFICATIONS_ACTION.SUCCESS,
    });
  } catch (error) {
    showMessage({
      message: NOTIFICATIONS_RESPONSE.SUCCESS,
      description: error?.data?.message,
      type: NOTIFICATIONS_ACTION.SUCCESS,
    });
  }
};
