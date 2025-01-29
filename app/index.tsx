import useAuthToken from '@/hooks/useAuthToken';
import {hydrate} from '@/store/store';
import {Redirect} from 'expo-router';
import React from 'react';

hydrate();
export default function index() {
  const token = useAuthToken();
  return token ? <Redirect href="(main)" /> : <Redirect href="(auth)" />;
}
