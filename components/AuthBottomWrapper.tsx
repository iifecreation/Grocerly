import {SAFE_AREA_PADDING} from '@/utils/utils';
import {t} from 'i18next';
import React, {ReactNode} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import Button from './nativewindui/Button';

type AuthBottomWrapperProps = {
  children: ReactNode;
  onPress: () => void;
  header: string;
  description: string;
  isDirty: boolean;
  isPending: boolean;
  btnName: string;
};
export default function AuthBottomWrapper({
  children,
  onPress,
  ...props
}: AuthBottomWrapperProps) {
  return (
    <View
      className=" w-full justify-center items-center"
      style={{
        paddingVertical: SAFE_AREA_PADDING.paddingTop,
      }}>
      <View>
        <Text className="text-center font-medium text-base leading-[40px] text-black">
          {props.header}
        </Text>
        <Text className="text-center text-xs font-medium leading-4 text-black">
          {props.description}
        </Text>
      </View>
      {children}

      <View className="w-full mt-6">
        <Button onPress={onPress} disabled={!props.isDirty}>
          {props.isPending ? (
            <ActivityIndicator size="small" color={'white'} />
          ) : (
            <Text className="leading-4 text-xs  text-white font-semibold">
              {props.btnName}
            </Text>
          )}
        </Button>
      </View>
    </View>
  );
}
