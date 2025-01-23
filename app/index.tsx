import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {};
// No text should be used directly. Please use the t from translation to access
// the text save in the locales file.
// this is to aid translation of the app
export default function index({}: Props) {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t('home.header')}</Text>
    </View>
  );
}
