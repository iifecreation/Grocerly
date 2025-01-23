import { Stack } from 'expo-router';

/**
 * note: All route must declared in the app-routes and reference here.
 * please do not use direct text
 *
 *
 */
const MainNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name={APP_ROUTES.HOME}></Stack.Screen>
    </Stack>
  );
};

export default MainNavigation;
