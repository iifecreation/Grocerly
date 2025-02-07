import {SCREEN_HEIGHT} from '@/utils/utils';
import React from 'react';
import {View, Image, Text} from 'react-native';

export default function ListEmptyContainer() {
  return (
    <View
      className="w-full justify-center items-center "
      style={{height: SCREEN_HEIGHT / 2}}>
      <Image source={require('@/assets/svg/empty.png')} />
      <Text className="font-bold text-base text-center mt-4">
        You Have No Delivery Information Yet
      </Text>
    </View>
  );
}
