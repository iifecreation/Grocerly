import { Stack } from 'expo-router';
import '../global.css';
import { useInitialAndroidBarSync, useColorScheme } from '../lib/useColorScheme';
import { NAV_THEME } from '../theme';
import MainNavigation from './main/_layout';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import i18n from '../i18next';
import { I18nextProvider } from 'react-i18next';

const Layout = () => {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <StatusBar hidden />
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaProvider>
      </I18nextProvider>
    </>
    // <>
    //   {/* <GestureHandlerRootView> */}
    //   <NavThemeProvider value={NAV_THEME[colorScheme]}>
    //     {/* <AuthNavigation /> */}

    //     <MainNavigation />
    //   </NavThemeProvider>
    //   {/* </GestureHandlerRootView> */}
    // </>
  );
};

export default Layout;
