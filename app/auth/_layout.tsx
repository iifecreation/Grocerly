import { Stack } from 'expo-router';
import { APP_ROUTES } from '../../contants/app-routes';

/**
 * note: All route must declared in the app-routes and reference here.
 * please do not use direct text
 *
 *
 */
const AuthNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name={APP_ROUTES.LOGIN}></Stack.Screen>
    </Stack>
  );
};

export default AuthNavigation;
