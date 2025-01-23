import { Stack } from 'expo-router';
import { APP_ROUTES } from '../../contants/app-routes';
import { Text } from '../../components/nativewindui/Text';

/**
 * note: All route must declared in the app-routes and reference here.
 * please do not use direct text
 *
 *
 */
const MainNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name={APP_ROUTES.HOME} />
    </Stack>
  );
};

export default MainNavigation;
