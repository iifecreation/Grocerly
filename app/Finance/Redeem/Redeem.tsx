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


const screenWidth = Dimensions.get("window").width;
// Function to get the day of the week from a date
const getDayOfWeek = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = new Date(date).getDay();
  return days[day];
};



const Redeem = () => {
  const {t} = useTranslation();
  const router = useRouter()
  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: wallet,
  } = useQuery({
    queryKey: [QUERY_ENUM.REDEEMCHART],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.REDEEMCHART);
    },
  });

  // const redeemChart = useMemo(() => wallet?.data, [wallet]);
  const redeemChart = {
    "data": [
      { "date": "2025-02-23", "totalReferrals": 200 },
      { "date": "2025-02-24", "totalReferrals": 145 },
      { "date": "2025-02-25", "totalReferrals": 70 },
      { "date": "2025-02-26", "totalReferrals": 120 },
      { "date": "2025-02-27", "totalReferrals": 150 },
      { "date": "2025-02-28", "totalReferrals": 170 },
      { "date": "2025-03-01", "totalReferrals": 210 }
    ],
    "message": "Referral Chart Fetched successfully"
  };

  const handleRedeem = () => {
    
  }
  
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
            (
              <View>
                <LineChart
                  data={{
                    labels: redeemChart?.data.map((item: any) => getDayOfWeek(item.date)),
                    datasets: [
                      {
                        data: redeemChart?.data.map((item: any) => item.totalReferrals)
                      }
                    ]
                  }}
                  width={screenWidth * 0.9} // To make it fit in the screen
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  yAxisInterval={50}
                  bezier
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(241, 90, 34, ${opacity})`, // Blue color for line
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for labels
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#F15A22'
                    },
                    // yAxisValues: [0, 50, 100, 150, 200, 250],
                  }}
                  style={{
                    // marginVertical: 8,
                    width: "100%",
                    borderRadius: 16
                  }}
                />

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
            )
          }
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