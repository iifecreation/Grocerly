import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';

export const STORAGE_NAME = 'user-auth-storage';

const storage = new MMKV();

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

export const activeUserToken = async () => {
  const userToken = await zustandStorage.getItem(STORAGE_NAME);
  const token = JSON.parse(userToken || '')?.state?.token;
  return token;
};

export const removeToken = async () => {
  await zustandStorage.removeItem(STORAGE_NAME);
};
