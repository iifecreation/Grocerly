import React from 'react';
import {APP_ROUTES} from '@/contants/app-routes';
import {Slot, Stack, Tabs} from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import ArchBorder from '@/components/ArchBorder';

/**
 * note: All route must declared in the app-routes and reference here.
 * please do not use direct text
 *
 *
 */
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default Layout;
