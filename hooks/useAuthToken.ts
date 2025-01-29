import {useAuthStore} from '@/store/store';

const useAuthToken = () => {
  const token = useAuthStore((state: any) => state.token);
  const setToken = useAuthStore((state: any) => state.setToken);

  const updateToken = (data: {token: string; refreshToken: string}) =>
    setToken(data?.token);

  return {updateToken, token};
};

export default useAuthToken;
