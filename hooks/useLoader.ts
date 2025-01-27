import {UserContext} from '@/app/_layout';
import {useContext} from 'react';

export default function useLoader() {
  const context = useContext(UserContext);

  return {
    loaderState: context?.updateLoader,
    handleUpdateLoader: context?.handleUpdateLoader,
  };
}
