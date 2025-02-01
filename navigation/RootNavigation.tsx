import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useAuthToken from '@/hooks/useAuthToken';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

export default function RootNavigation() {
  const token = useAuthToken();
  return <AuthNavigation />;
  // return <>{!token ? <AuthNavigation /> : <MainNavigation />}</>;
}
