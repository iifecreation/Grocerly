/* eslint-disable react-native/no-inline-styles */

import {cn} from '@/lib/cn';
import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import ErrorMessage from './nativewindui/ErrorMessage';
import Ionicons from '@expo/vector-icons/Ionicons';

type TextInputTypes = {
  handleBlur: (arg: any) => void;
  placeholder: string;

  value: string | number | any;
  onChangeText: (arg: string) => void;
  keyboardType?: string | any;
  maxLength?: number | string | any;
  errorMessage: string | any;
  autoComplete?: boolean | any;

  rightIcon?: SVGRectElement;
  secureTextEntry?: boolean;
  id: string;
  readOnly?: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
  multiline?: boolean;
};

export default function TextInputComp({
  handleBlur,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  maxLength,
  errorMessage,
  autoComplete,
  secureTextEntry,
  id,
  label,
  readOnly = false,
  className,
  multiline,
}: TextInputTypes) {
  const [isFocused, setFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  function toggleShowPassword() {
    setHidePassword(prevState => !prevState);
  }
  return (
    <View className="relative">
      <TextInput
        {...(label ? {label} : {})}
        onFocus={() => {
          setFocused(prevState => !prevState);
          handleBlur(id);
        }}
        className={cn(
          `border rounded-[4px] h-12 w-full px-4 placeholder:text-base font-normal placeholder:leading-[25px] placeholder:text-gray-500 ${isFocused ? 'border-red-900' : 'border-gray-300'}`,
          className,
        )}
        onBlur={() => {
          setFocused(prevState => !prevState);
          handleBlur(id);
        }}
        secureTextEntry={hidePassword}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChangeText={onChangeText}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        maxLength={maxLength || null}
        multiline={multiline}
        style={{textAlignVertical: multiline ? "top": "center"}}
      />
      {/* <Icon /> */}
      {id === 'password' ? (
        <Ionicons
          onPress={toggleShowPassword}
          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          className="absolute top-3 right-2"
          size={24}
        />
      ) : null}
      <ErrorMessage errorMessage={errorMessage} />
    </View>
  );
}

// const styles = StyleSheet.create()
