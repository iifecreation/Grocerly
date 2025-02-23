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
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { APP_ROUTES } from '@/contants/app-routes';
import NoReferralsIcon from '@/components/icons/NoReferrals'
import LineChartComp from '@/components/common/Chart/LineChart';
import ScanIcon from '@/components/icons/Scan'
import ReferIcon from '@/components/icons/Refer'
import CustomTwoButton from '@/components/CustomTwoButton';



const ReferEarn = () => {
  const {t} = useTranslation();
  const router = useRouter()

  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: referrals,
  } = useQuery({
      queryKey: [QUERY_ENUM.REFERRALS],
      queryFn: async () => {
        return await axiosInstance.get(API_ROUTES.REFERRALS);
      },
  });

  const referralsData = useMemo(() => referrals?.data, [referrals]);
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.Redeem.title")} />
        </ArchBorder>

        <ScrollView style={styles.headerDesc}>
          {
            isLoading || isFetching ? 
              (<ActivityIndicator size='large' className='items-center justify-center w-full' />)
            :
            error 
            ? 
            (
              <View>
                <Text className='text-base font-bold text-center'>{t("Finance.Transaction_Details.error")}</Text>
              </View>
            )
            :
            referralsData?.user.length == 0 ?
            (
              <View className='w-full items-center justify-center mt-8'>
                  <View className='mb-5'>
                      <NoReferralsIcon />
                  </View>
                  <Text className='text-base font-bold text-center mb-2'>{t("Finance.Redeem.none.title")}</Text>
                  <Text className='text-sm font-medium text-center'>{t("Finance.Redeem.none.desc")}</Text>

                  <CustomTwoButton
                    icon1={<ReferIcon color="#FAFAFA" />}
                    icon2={<ScanIcon />}
                    moveButton={() => router.push(APP_ROUTES.SHARELINK)}
                    moveButtonTwo={() => router.push(APP_ROUTES.SHAREQR)}
                    text1={t("button.share_Link")}
                    text2={t("button.Scan_QR")}
                  />
              </View>
            )
            :
            (
              <>
                <View>
                  <LineChartComp  />

                  <CustomTwoButton
                    icon1={<ReferIcon color="#FAFAFA" />}
                    icon2={<ScanIcon />}
                    moveButton={() => router.push(APP_ROUTES.SHARELINK)}
                    moveButtonTwo={() => router.push(APP_ROUTES.SHAREQR)}
                    text1={t("button.share_Link")}
                    text2={t("button.Scan_QR")}
                  />
                </View>
              </>
            )
          }
        
        </ScrollView>

      </View>
    </ScreenWrapper>
  );
}

export default ReferEarn

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