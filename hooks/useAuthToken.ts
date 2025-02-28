import { removeToken } from '@/store/storage';
import {useAuthStore} from '@/store/store';

const useAuthToken = () => {
  const token = useAuthStore((state: any) => state.token);
  const setToken = useAuthStore((state: any) => state.setToken);
  const userData = useAuthStore((state: any) => state.userData);
  const setUserData = useAuthStore((state: any) => state.userSetData);
  const Logout = useAuthStore((state: any) => state.logOut);
  const handleSkipOnboarding = useAuthStore((state: any) => state.handleSkipOnboarding);


  const updateToken = (data: {token: string; refreshToken: string}) =>
    setToken(data?.token);

  const updateUserData = (data: {userData: any}) =>  setUserData(data)

  const logOut = () => {
    Logout()
    removeToken()
    handleSkipOnboarding()
  }

  return {updateToken, token, userData, updateUserData, logOut};
};

export default useAuthToken;
