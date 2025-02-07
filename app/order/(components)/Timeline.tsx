import {cn} from '@/lib/cn';
import {COLORS} from '@/theme/colors';
import React from 'react';
import {ReactElement} from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';

interface TimeLineCompProps {
  item: {
    status: string;
    reason: string;
    createdAt: string;
  };
  isLastItem?: boolean;
}
const TimeLineComp = ({item, isLastItem}: TimeLineCompProps) => {
  return (
    <View
      className=" flex flex-row items-center gap-x-6
     !relative">
      <View className="w-[66px] h-[66px] bg-orange-100 flex flex-row items-center justify-center rounded-full ">
        {statusIcon[item?.status]}
        <View
          className={cn(
            isLastItem
              ? 'bg-transparent  h-0 w-0'
              : 'bg-gray-200 h-10  w-0.5 absolute top-[66px]',
          )}
        />
      </View>

      <View className="gap-y-1 border-b border-gray-200 h-full w-[70%]">
        <Text className="font-semibold text-[15px] leading-[18px]">
          {item?.reason}
        </Text>
        <Text className=" text-xs text-gray-500 leading-[18px]">
          {format(new Date(item?.createdAt ?? new Date()), 'MMMM d yyyy')}
        </Text>
      </View>
    </View>
  );
};

export default TimeLineComp;

const statusIcon: {[x: string]: ReactElement} = {
  pending: (
    <MaterialCommunityIcons
      name="package-variant"
      size={29}
      color={COLORS.light.primary}
    />
  ),
};
