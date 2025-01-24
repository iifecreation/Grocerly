import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import { TextInput, View } from 'react-native';

export default function index() {
  return (
    <ScreenWrapper background={COLORS.light.background}>
      <View className="flex-1 justify-center items-center bg-red-200">
        <TextInput className="h-[48px] w-full  border border-spacing-1" />
      </View>
    </ScreenWrapper>
  );
}
