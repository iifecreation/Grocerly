import { View, Text, ImageBackground } from 'react-native';
import React, { ReactNode } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/utils';
import {COLORS} from '@/theme/colors';

const ArchBorder = ({children}: {children: ReactNode}) => {
  return (
    <View
      style={{
        height: SCREEN_HEIGHT / 4,
        backgroundColor: COLORS.light.primary,
      }}
      className=" w-full relative ">
      <View className="h-full flex items-center justify-center w-full ">
        {children}
      </View>
      <ImageBackground
        source={require('@/assets/arch.png')}
        className="absolute bottom-0  -z-1"
        style={{height: 75, width: SCREEN_WIDTH, position: "absolute", zIndex: 1}}
      />
    </View>
  );
};

export default ArchBorder;
