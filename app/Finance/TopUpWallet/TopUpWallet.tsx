import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { QUERY_ENUM } from '@/contants';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import WalletCard from '@/components/Finance/WalletCard';
import TransactionHistory from '@/components/Finance/TransactionHistory';


const TopUpWallet = () => {
  const {t} = useTranslation();
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.TopUpWallet.title")} />
        </ArchBorder>

        <View style={styles.headerDesc}>

          
          
        </View>

      </View>
    </ScreenWrapper>
  );
}

export default TopUpWallet

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