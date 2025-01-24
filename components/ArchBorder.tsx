import { View, Text, ImageBackground } from 'react-native';
import React, { ReactNode } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/utils';

const ArchBorder = ({ children }: { children: ReactNode }) => {
  return (
    <View style={{ height: SCREEN_HEIGHT / 5 }} className="bg-destructive w-full relative ">
      {children}
      <ImageBackground
        source={require('@/assets/arch.png')}
        className="absolute bottom-0 -z-1"
        style={{ height: 75, width: SCREEN_WIDTH }}
      />
    </View>
  );
};

export default ArchBorder;
