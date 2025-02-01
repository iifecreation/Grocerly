import useAuthToken from '@/hooks/useAuthToken';
import {hydrate} from '@/store/store';
import {Redirect} from 'expo-router';
import React from 'react';

hydrate();
export default function index() {
  const token = useAuthToken();
  // console.log('token', token);
  // return token ? <Redirect href="(main)" /> : <Redirect href="(auth)" />;
  // return <Redirect href="(auth)" />;
  return <Redirect href="(auth)/VerifyAccount" />;
}
