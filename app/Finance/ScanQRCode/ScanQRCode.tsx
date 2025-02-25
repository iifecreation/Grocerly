import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import ShareLinkComp from '@/components/common/ShareLink/ShareLink';
import { useAuthStore } from '@/store/store';
import QRCode from 'react-native-qrcode-svg';

const ScanQRCode = () => {
  const {t} = useTranslation();
  const {userData} = useAuthStore();
  let referralCode = `your-app-scheme://jdnncvw238892nniij/referral?code=${userData?.referralCode}`
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.TopUpWallet.title")} />
        </ArchBorder>

        <ScrollView style={styles.headerDesc} showsVerticalScrollIndicator={false}>
          <ShareLinkComp />

          <View className='mt-5 pb-10' >
            <Text className='text-center mb-5'>{t("Finance.Share.align")}</Text>

            <View className='items-center mb-8'>
              <QRCode
                value={referralCode}
                size={150}
              />
            </View>
          </View>
        </ScrollView>

      </View>
    </ScreenWrapper>
  );
}

export default ScanQRCode

const styles = StyleSheet.create({
  headerDesc: {
    flex: 1,
    width: "100%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
});