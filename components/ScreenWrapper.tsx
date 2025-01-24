import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

export default function ScreenWrapper({
  children,
  background = 'white',
}: {
  children: ReactNode;
  background: string;
}) {
  return (
    <View className="flex-1">
      <StatusBar backgroundColor={background} />
      <View className="flex-1">{children}</View>
    </View>
  );
}
