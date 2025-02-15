import React from 'react';
import {Stack} from 'expo-router';
import {APP_ROUTES} from '../../contants/app-routes';

/**
 * note: All route must declared in the app-routes and reference here.
 * please do not use direct text
 *
 *
 */
const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={APP_ROUTES.CREATE_ACCOUNT} />
      <Stack.Screen name={APP_ROUTES.VERIFY_OTP} />
    </Stack>
  );
};

export default AuthLayout;
