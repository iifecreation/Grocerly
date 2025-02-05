import {TextInput, View} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLORS} from '@/theme/colors';

export default function SearchInput() {
  return (
    <View className="rounded-[60px] border overflow-hidden h-[34px] flex items-center justify-center border-gray-400 ">
      <Ionicons
        name="search-outline"
        size={24}
        color={COLORS.light.grey4}
        style={{position: 'absolute', left: 10}}
      />
      <TextInput
        placeholder="Search for delivery"
        className="h-full px-3 placeholder:text-black placeholder:font-medium  w-[80%]"
      />
    </View>
  );
}
