import {cn} from '@/lib/cn';
import {COLORS} from '@/theme/colors';
import React, {ReactNode} from 'react';
import {Pressable, Text} from 'react-native';

type ButtonProps = {
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
};
const Button = ({onPress, disabled = false, children}: ButtonProps) => {
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
      {children}
    </Pressable>
  );
};

export default Button;
