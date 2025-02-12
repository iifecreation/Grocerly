import React from 'react';
import {APP_ROUTES} from '@/contants/app-routes';
import {Tabs} from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {COLORS} from '@/theme/colors';
import { useTranslation } from 'react-i18next';

/**
 * note: All route must declared in the app-routes and reference here.
 * please do not use direct text
 *
 *
 */
const Layout = () => {
  const {t} = useTranslation()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name={APP_ROUTES.HOME}
        options={{
          title: t('Tab.Home'),
          tabBarIcon: ({color, focused}) => (
            <Octicons
              name="home"
              size={24}
              color={focused ? COLORS.light.primary : COLORS.light.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.ORDER}
        options={{
          title: t('Tab.Order'),
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={24}
              color={focused ? COLORS.light.primary : COLORS.light.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.FINANCE}
        options={{
          title: t('Tab.Finance'),
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="wallet-outline"
              size={24}
              color={focused ? COLORS.light.primary : COLORS.light.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.CART}
        options={{
          title: t('Tab.Cart'),
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="cart-outline"
              size={24}
              color={focused ? COLORS.light.primary : COLORS.light.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.ACCOUNT}
        options={{
          title: t('Tab.Account'),
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? COLORS.light.primary : COLORS.light.grey3}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;