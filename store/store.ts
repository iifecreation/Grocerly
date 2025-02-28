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

// removeToken();

  export const useAuthStore = create(
    persist(
      (set, get: any) => ({
        token: null,
        userData: null,
        setToken: (data: any) => set({token: data}),
        userSetData: (data: any) => set({userData: data}),
        logOut: () => set({token: '', userData: null}),
        isOnboarded: false,
        handleSkipOnboarding: () => set({isOnboarded: true}),

        hydrate: async () => {
          const activeToken = await activeUserToken();
          if (!activeToken) {
            // sign out
            removeToken();
            get().handleSkipOnboarding();
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
export const appState = useAuthStore.getState().token;