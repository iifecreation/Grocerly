import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import AddressIcon from "@/components/icons/AddressIcon"
import CustomButton from '@/components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { ActivityIndicator } from 'react-native-paper';


const Address = () => {
    const {t} = useTranslation();
    const router = useRouter()

    const {
      isLoading,
      isFetching,
      error,
      isError,
      data: data,
    } = useQuery({
      queryKey: [QUERY_ENUM.ADDRESS],
      queryFn: async () => {
        return await axiosInstance.get(API_ROUTES.FETCH_ADDRESS);
      },
    });

    const addressList = useMemo(() => data?.data, [data]);
    
    const addAddress = () => {
      router.push(APP_ROUTES.ADD_ADDRESS)
    }
  
    return (
        <ScreenWrapper background={COLORS.light.primary}>
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t("account.Address.title")} />
            </ArchBorder>

            <View style={styles.headerDesc}>
            {
              isLoading || isFetching ? (
                <ActivityIndicator size={'large'} />
              ) : isError ? (
                <Text className="text-center font-bold text-lg">{t("account.Address.error")}</Text>
              ) : addressList?.addresses?.length === 0 ? (
                <View className="w-full items-center justify-center">
                  <AddressIcon />
                  <CustomButton navigateProps={addAddress} textProps={t("button.add_Address")}>
                    <Ionicons name="location-outline" size={24} color="#ffffff" />
                  </CustomButton>
                </View>
              ) : (
                <View>
                  {/* You can add additional components or content here if needed */}
                </View>
              )
            }
            
            </View>
        </View>
        </ScreenWrapper>
    )
}

export default Address

const styles = StyleSheet.create({
  headerDesc: {
    width: "100%",
    flex: 1,
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
});