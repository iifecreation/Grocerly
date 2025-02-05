import {View, Text, Image} from 'react-native';
import React from 'react';
import {BOTTOM_WRAPPER_PAGES} from '@/contants';
import Button from '../nativewindui/Button';
import {useTranslation} from 'react-i18next';

type SetPasswordProps = {
  handleUpdateActivePage: (arg: {
    page: BOTTOM_WRAPPER_PAGES;
    email: string;
  }) => void;
};

const ProceedToLogin = ({handleUpdateActivePage}: SetPasswordProps) => {
  const {t} = useTranslation();
  function onPress() {
    handleUpdateActivePage({
      page: BOTTOM_WRAPPER_PAGES.LOGIN,
      email: '',
    });
  }
  return (
    <View className="justify-center items-center w-full gap-y-6 ">
      <Image
        source={require('@/assets/reset-password.png')}
        resizeMethod="scale"
        className="h-[115px] w-[180px] object-contain"
        resizeMode="contain"
      />
      <Text className="font-bold text-2xl text-black text-center  px-6">
        {t('createPassword.success')}
      </Text>
      <Button onPress={onPress}>
        <Text className="text-white text-xs font-semibold leading-4">
          {t('buttons.processLogin')}
        </Text>
      </Button>
    </View>
  );
};

export default ProceedToLogin;
