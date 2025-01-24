import { NAV_THEME } from '@/theme';
import { COLORS } from '@/theme/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/utils';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { ImageBackground, View } from 'react-native';

export default function ScreenWrapper({ children }: { children: ReactNode }) {
  return (
    <View className="flex-1">
      <StatusBar backgroundColor={COLORS.light.destructive} />

      <View className="bg-white">{children}</View>
    </View>
  );
}
