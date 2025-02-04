import React from 'react';
import {APP_ROUTES} from '@/contants/app-routes';
import {Slot, Stack, Tabs} from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import ArchBorder from '@/components/ArchBorder';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {COLORS} from '@/theme/colors';

/**
 * note: All route must declared in the app-routes and reference here.
 * please do not use direct text
 *
 *
 */
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
          headerShown: false,
      }}
    >
      <Tabs.Screen
        name={APP_ROUTES.HOME}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Octicons name="home" size={24} color={focused ? COLORS.light.primary : COLORS.light.grey3} />,
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.ORDER}
        options={{
          title: 'Order',
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name="truck-fast-outline" size={24} color={focused ? COLORS.light.primary : COLORS.light.grey3} />,
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.FINANCE}
        options={{
          title: 'Finance',
          tabBarIcon: ({ color, focused }) => <Ionicons name="wallet-outline" size={24} color={focused ? COLORS.light.primary : COLORS.light.grey3} />,
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.CART}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => <Ionicons name="cart-outline" size={24} color={focused ? COLORS.light.primary : COLORS.light.grey3} />,
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.ACCOUNT}
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => <Ionicons name="person-outline" size={24} color={focused ? COLORS.light.primary : COLORS.light.grey3} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
