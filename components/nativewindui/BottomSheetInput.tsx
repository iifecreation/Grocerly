import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import ErrorMessage from './ErrorMessage';
type BottomSheetInputProps = {
  placeholder: string;
  onChange: () => void;
  value: string;
  isPending: boolean;
  errors: string | undefined;
};
const BottomSheetInput = ({
  placeholder,
  onChange,
  value,
  isPending,
  errors,
}: BottomSheetInputProps) => {
  return (
    <>
      <BottomSheetTextInput
        className={`border rounded-[4px] h-12 w-full px-4 placeholder:text-base font-normal placeholder:leading-[25px] placeholder:text-black `}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        readOnly={isPending}
      />
      <ErrorMessage errorMessage={errors} />
    </>
  );
};

export default BottomSheetInput;

const styles = StyleSheet.create({});
