import {View, Text, StyleSheet} from 'react-native';
import {SAFE_AREA_PADDING} from '@/utils/utils';
import React from 'react';
import ArchBorder from '@/components/ArchBorder';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import Header from '@/components/home/header';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';

const notification = () => {
  const {t} = useTranslation();
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t('notification.header')} />
        </ArchBorder>

        <View style={styles.headerDesc}>
          <Text className='text-center'>{t('notification.headerTitle')}</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default notification;

const styles = StyleSheet.create({
  headerDesc: {
    position: "absolute",
    top: 150,
    zIndex: 10,
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  }
});