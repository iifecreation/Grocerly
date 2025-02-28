import {Stack} from 'expo-router';
import '../global.css';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import * as SplashScreen from 'expo-splash-screen';
import {LogBox} from 'react-native';
import React, { useEffect } from 'react';
import {ThemeProvider as NavThemeProvider} from '@react-navigation/native';
import {NAV_THEME} from '@/theme';
import {useColorScheme, useInitialAndroidBarSync} from '@/lib/useColorScheme';
import i18n from '@/i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useReactQueryDevTools} from '@dev-plugins/react-query';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";

LogBox.ignoreAllLogs(true);
const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useInitialAndroidBarSync();
  const {colorScheme} = useColorScheme();
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const merchantId = Constants.expoConfig?.plugins?.find(
    (p) => p[0] === "@stripe/stripe-react-native"
  )?.[1].merchantIdentifier;

  return (
    <>
      <StripeProvider 
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
        merchantIdentifier={merchantId}
      >
        <GestureHandlerRootView>
          <I18nextProvider i18n={i18n}>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <FlashMessage position="top" duration={5000} hideStatusBar />
              <SafeAreaProvider style={{}}>
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
      </StripeProvider>
    </>
  );
};

export default Layout;
