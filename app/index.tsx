import Onboarding from '@/components/Onboarding';
import useAuthToken from '@/hooks/useAuthToken';
import {hydrate, useAuthStore} from '@/store/store';
import {Redirect} from 'expo-router';
import React from 'react';

hydrate();
export default function index() {
  const {token} = useAuthToken();
  const {isOnboarded} = useAuthStore();
  if (!isOnboarded) {
    return <Onboarding/>
    
  }
  return token ? <Redirect href="(main)" /> : <Redirect href="(auth)" />;
}
