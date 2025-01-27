import { API_ROUTES } from '@/contants/api-routes';
import axiosInstance from './config';
import { showMessage } from 'react-native-flash-message';
import { NOTIFICATIONS_ACTION, NOTIFICATIONS_RESPONSE } from '@/contants';
import getErrorMessage from '@/utils/error-formatter';

export const loginAPI = async (data: any) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, data);
  } catch (error: any) {
    showMessage({
      message: NOTIFICATIONS_RESPONSE.ERROR,
      description: getErrorMessage(error?.error?.statusCode),
      type: NOTIFICATIONS_ACTION.DANGER,
    });
  }
};
