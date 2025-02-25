import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useMemo, useRef, useState, } from 'react'
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
import { FlatList } from 'react-native-gesture-handler';
import commonStyles from '@/components/styles/common';



const ReferEarn = () => {
  const {t} = useTranslation();
  const router = useRouter()
  const listRef = useRef(null)

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
  console.log(referralsData);
  

  const movetoShare = () => {
    router.push(APP_ROUTES.SHARELINK)
  }

  const movetoShareQR = () => {
    router.push(APP_ROUTES.SCANQRCODE)
  }
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.Redeem.title1")} />
        </ArchBorder>

        <ScrollView style={styles.headerDesc}>
          <View>
            <LineChartComp nodata={referralsData?.user.length == 0 ? true : false} />
          </View>

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
              <View className='w-full items-center justify-center mt-14 mb-12'>
                  <View className='mb-5'>
                      <NoReferralsIcon />
                  </View>
                  <Text className='text-base font-bold text-center mb-2'>{t("Finance.Redeem.none.title")}</Text>
                  <Text className='text-sm font-medium text-center'>{t("Finance.Redeem.none.desc")}</Text>

                  <CustomTwoButton
                    icon1={<ReferIcon color="#FAFAFA" />}
                    icon2={<ScanIcon />}
                    moveButton={movetoShare}
                    moveButtonTwo={movetoShareQR}
                    text1={t("button.share_Link")}
                    text2={t("button.Scan_QR")}
                  />
              </View>
            )
            :
            (
              <View className='mb-12 mt-8'>
                <Text className='font-bold text-base mb-4'>{t("Finance.Redeem.Recent_Referal")}</Text>

                <FlatList
                  ref={listRef}
                  data={referralsData?.user}
                  numColumns={1}
                  keyExtractor={(_, id) => id.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{columnGap: 10, rowGap: 15, width: "100%", flex: 1, marginBottom: 4 }}
                  renderItem={(item) => {
                    return (
                    <View style={commonStyles.shadow2} className='w-full flex-row justify-between items-center gap-3 px-3 py-4 rounded-lg'>
                        <View className='items-center justify-center rounded-xl w-10 h-10' style={{backgroundColor: "#FFEDEF"}}>
                            {item?.item?.avatar}
                        </View>
                        <View className='flex-1 '>
                            <Text className='text-base font-semibold mb-1'>{t("Finance.Transaction_Details.id")} {item?.item?.transactionId}</Text>
                            <Text className='text-xs font-medium'>{new Date(item?.item?.createdAt).toLocaleDateString()}</Text>
                        </View>
                        <Text className='font-bold text-lg' style={{color: COLORS.light.primary}}>${item?.item?.amount}</Text>
                    </View>
                    )
                  }}  
                />

                <CustomTwoButton
                  icon1={<ReferIcon color="#FAFAFA" />}
                  icon2={<ScanIcon />}
                  moveButton={() => router.push(APP_ROUTES.SHARELINK)}
                  moveButtonTwo={() => router.push(APP_ROUTES.SCANQRCODE)}
                  text1={t("button.share_Link")}
                  text2={t("button.Scan_QR")}
                />
              </View>
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
  }
});