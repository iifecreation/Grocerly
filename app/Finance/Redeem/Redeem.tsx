import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useMemo, useState, } from 'react'
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
import RedeemIcon from "@/components/icons/Redeem"
import { useRouter } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { ActivityIndicator } from 'react-native';
import { APP_ROUTES } from '@/contants/app-routes';
import CustomButton from '@/components/CustomButton';
import LineChartComp from '@/components/common/Chart/LineChart';


const Redeem = () => {
  const {t} = useTranslation();
  const router = useRouter()

  const handleRedeem = () => {
    
  }
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.Redeem.title")} />
        </ArchBorder>

        <ScrollView style={styles.headerDesc}>
          <View>
            <LineChartComp />

            <View className='mt-5'>
              <View className='flex-row justify-between items-center mb-4'>
                <Text className='font-bold text-base'>{t("Finance.Redeem.Redeem_Credit")}</Text>
                <TouchableOpacity onPress={() => router.push(APP_ROUTES.CREDITHISTORY)}>
                  <Text className='font-medium text-sm border-b' style={{color: COLORS.light.primary, borderBottomColor: COLORS.light.primary}}>
                  {t("Finance.Redeem.view")}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className='text-gray-500'>{t("Finance.Redeem.enter")}</Text>

              <CustomButton navigateProps={handleRedeem} textProps={t("button.Redeem")}>
                <RedeemIcon color="#FAFAFA" />
              </CustomButton>
            </View>

          </View>
        </ScrollView>

      </View>
    </ScreenWrapper>
  );
}

export default Redeem

const styles = StyleSheet.create({
  headerDesc: {
    flex: 1,
    width: "100%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
  finance: {
    flex: 1
  }
});