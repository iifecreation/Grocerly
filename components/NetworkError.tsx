import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from './nativewindui/Button';
import {useTranslation} from 'react-i18next';

const NetworkError = ({reload}: {reload: any}) => {
  const {t} = useTranslation();
  function handleReload() {
    reload();
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{t('networkRequest.network')}</Text>
      <Button className="w-1/2" onPress={handleReload}>
        <Text className="text-white">{t('networkRequest.reload')}</Text>
      </Button>
    </View>
  );
};

export default NetworkError;

const styles = StyleSheet.create({});
