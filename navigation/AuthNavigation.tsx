import {APP_ROUTES} from '@/contants/app-routes';
import {Stack} from 'expo-router';
import React from 'react';

export default function AuthNavigation() {
  return (
    // <Stack>
    <Stack.Screen name={APP_ROUTES.LOGIN} />
    // </Stack>
  );
}
