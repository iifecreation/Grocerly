import {createJSONStorage, persist} from 'zustand/middleware';
import {create} from 'zustand';
import {
  STORAGE_NAME,
  activeUserToken,
  removeToken,
  zustandStorage,
} from './storage';

type Tokentypes = {
  token: {accessToken: string; refreshToken: string};
  userData?: any;
};
type Action = {
  setToken: (token: Tokentypes) => void;
  userSetData: (userData: Tokentypes['userData']) => void;
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: '',
      userData: null,
      setToken: (data: any) => set({token: data}),
      userSetData: () => set({}),
      logOut: () => set({token: '', userData: null}),
      hydrate: () => {
        const activeToken = activeUserToken();
        if (!activeToken) {
          // sign out
          removeToken();
        } else {
          // update login
          get().setToken(activeToken);
        }
        try {
        } catch (error) {
          get().logOut();
        }
      },
    }),

    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
) as any;

export const hydrate = useAuthStore.getState().hydrate;
