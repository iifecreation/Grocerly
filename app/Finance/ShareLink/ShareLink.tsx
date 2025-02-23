import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import ShareLinkComp from '@/components/common/ShareLink/ShareLink';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

const ShareLink = () => {
  const {t} = useTranslation();

  const copyToClipboard = async () => {
    const textToCopy = "https://example.com"; // Example text to copy
    await Clipboard.setStringAsync(textToCopy); // Copy text to clipboard
    // Show toast message
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Link Copied!',
      visibilityTime: 2000,
    });
  };
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.Share.Share_Link")} />
        </ArchBorder>

        <View style={styles.headerDesc}>
          <ShareLinkComp />

          <View className='mt-5' >
            <Text className='bg-gray-200 w-full px-2 py-3 border border-gray-300 rounded-md'>https://www.order.net/usernamecode</Text>
            <TouchableOpacity className='items-center justify-center flex-row mt-5 gap-3' onPress={copyToClipboard}>
              <Ionicons name="copy-outline" size={24} color={COLORS.light.primary} />
              <Text className='text-base font-semibold' style={{color: COLORS.light.primary}}>{t("Finance.Share.copy")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Toast configuration */}
        <Toast  />
      </View>
    </ScreenWrapper>
  );
}

export default ShareLink

const styles = StyleSheet.create({
  headerDesc: {
    // position: "absolute",
    flex: 1,
    // top: 150,
    zIndex: 10,
    width: "100%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
  finance: {
    flex: 1
  }
});