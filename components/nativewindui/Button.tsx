import {cn} from '@/lib/cn';
import {COLORS} from '@/theme/colors';
import React, {ReactNode} from 'react';
import {ActivityIndicator, Pressable, StyleSheet} from 'react-native';
import {ClassNameValue} from 'tailwind-merge';

type ButtonProps = {
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  className?: ClassNameValue;
  type?: 'outline' | 'solid';
  style?: any;
};
const Button = ({
  onPress,
  disabled = false,
  children,
  isLoading = false,
  className,
  type = 'solid',
}: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={cn(
        `h-[46px] py-0.5 w-full rounded-[28px] items-center justify-center mt-4 `,
        className,
      )}
      style={{
        backgroundColor: !disabled ? COLORS.light.primary : COLORS.light.grey,
        ...(type === 'outline' ? style.ountlineButton : {}),
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

const style = StyleSheet.create({
  ountlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.light.primary,
  },
});