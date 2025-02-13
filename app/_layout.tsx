import {Stack} from 'expo-router';
import '../global.css';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import {LogBox} from 'react-native';
import React from 'react';
import {ThemeProvider as NavThemeProvider} from '@react-navigation/native';
import {NAV_THEME} from '@/theme';
import {useColorScheme, useInitialAndroidBarSync} from '@/lib/useColorScheme';
import i18n from '@/i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useReactQueryDevTools} from '@dev-plugins/react-query';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// LogBox.ignoreAllLogs(true);

const queryClient = new QueryClient();

const Layout = () => {
  useInitialAndroidBarSync();
  const {colorScheme} = useColorScheme();
  useReactQueryDevTools(queryClient);
  return (
    <>
      <GestureHandlerRootView>
        <I18nextProvider i18n={i18n}>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            <FlashMessage position="top" duration={5000} hideStatusBar />
            <SafeAreaProvider>
              <QueryClientProvider client={queryClient}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />
              </QueryClientProvider>
            </SafeAreaProvider>
          </NavThemeProvider>
        </I18nextProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default Layout;
