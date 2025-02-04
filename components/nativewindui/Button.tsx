import {cn} from '@/lib/cn';
import {COLORS} from '@/theme/colors';
import React, {ReactNode} from 'react';
import {ActivityIndicator, Pressable, Text} from 'react-native';

type ButtonProps = {
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
};
const Button = ({
  onPress,
  disabled = false,
  children,
  isLoading = false,
}: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={cn(
        'h-[46px] py-0.5 w-full rounded-[28px] items-center justify-center mt-4',
      )}
      style={{
        backgroundColor: !disabled ? COLORS.light.primary : COLORS.light.grey,
      }}>
      {isLoading ? (
        <ActivityIndicator size="small" color={'white'} />
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;
