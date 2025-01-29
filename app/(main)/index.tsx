import {View, Text} from 'react-native';
import React from 'react';
import ArchBorder from '@/components/ArchBorder';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';

const index = () => {
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <ArchBorder>
        <Text className="text-black text-lg ">Main Dashboard</Text>
      </ArchBorder>
      <View className="bg-red-700 h-24 w-full ">
        <Text>Main Dashboard</Text>
      </View>
    </ScreenWrapper>
  );
};

export default index;
