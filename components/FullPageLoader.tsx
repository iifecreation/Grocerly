import { View, Text } from 'react-native';
import React from 'react';
import { ActivityIndicator } from './nativewindui/ActivityIndicator';
import { SCREEN_WIDTH } from '@/utils/utils';
import {COLORS} from '@/theme/colors';

const FullPageLoader = () => {
  return (
    <View
      style={{width: SCREEN_WIDTH, backgroundColor: COLORS.light.primarytrans}}
      className="flex-1 absolute top-0 z-10 left-0 h-full justify-center items-center bg-destructive-foreground">
      <ActivityIndicator size={60} />
    </View>
  );
};

export default FullPageLoader;
