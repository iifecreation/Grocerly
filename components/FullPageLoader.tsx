import { View, Text } from 'react-native';
import React from 'react';
import { ActivityIndicator } from './nativewindui/ActivityIndicator';
import { SCREEN_WIDTH } from '@/utils/utils';

const FullPageLoader = () => {
  return (
    <View
      style={{ width: SCREEN_WIDTH }}
      className="flex-1 justify-center items-center bg-destructive-foreground">
      <ActivityIndicator size={60} />
    </View>
  );
};

export default FullPageLoader;
