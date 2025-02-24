import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import ShareLinkComp from '@/components/common/ShareLink/ShareLink';

const ScanQR = () => {
  const {t} = useTranslation();
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.TopUpWallet.title")} />
        </ArchBorder>

        <ScrollView style={styles.headerDesc}>
          <ShareLinkComp />

          <View className='mt-5' >
            <Text className='text-center'>{t("Finance.Share.align")}</Text>
          </View>
        </ScrollView>

      </View>
    </ScreenWrapper>
  );
}

export default ScanQR

const styles = StyleSheet.create({
  headerDesc: {
    flex: 1,
    width: "100%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
});