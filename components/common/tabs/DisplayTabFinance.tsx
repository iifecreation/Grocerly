
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import WalletCard from '@/components/Finance/WalletCard';
import TransactionHistory from '@/components/Finance/TransactionHistory';
import { COLORS } from '@/theme/colors';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { APP_ROUTES } from '@/contants/app-routes';
import GreaterThan from "@/components/icons/greaterThan"
import CreditIcon from "@/components/icons/Credit"
import QuestionIcon from "@/components/icons/Question"
import RedeemIcon from "@/components/icons/Redeem"
import ReferIcon from "@/components/icons/Refer"


const { height } = Dimensions.get('window');

const DisplayTabFinance = ({activeTab, }: {activeTab: string,}) => {
  const {t} = useTranslation();
  const router = useRouter()
  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: wallet,
  } = useQuery({
    queryKey: [QUERY_ENUM.WALLET],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.FETCH_WALLET);
    },
  });

  const orderList = useMemo(() => wallet?.data, [wallet]);

  switch (activeTab) {
      case "My Wallet":
        return (
          <View>
            <WalletCard isLoading={isLoading} isFetching={isFetching}>
              <>
                <View className='mt-10'>
                  <Text className='text-sm font-semibold mb-4'>{t("Finance.Balance")}</Text>
                  <Text className='text-3xl font-black'>$ {orderList?.data?.balance?.availableBalance}.00</Text>
                  <Text className='text-sm font-semibold'>{orderList?.data?.identifier?.fullName}</Text>
                  </View>

                <View style={{marginTop: height * 0.12, alignItems: "center"}} >
                  <TouchableOpacity style={styles.plus} onPress={() => router.push(APP_ROUTES.TOPUPWALLET)}>
                    <Entypo name="plus" size={40} color="#FFF5ED" />
                  </TouchableOpacity>
                  <Text className='capitalize mt-2 font-medium'>{t("Finance.Topup_wallet")}</Text>
                </View>
              </>
            </WalletCard>
            
            <View className='mt-5 w-full'>
              <TransactionHistory />
            </View>
          </View>
        );
  
      case "My Savings":
        return (
          <View>
  
          </View>
        );
  
      case "My Referrals":
        return (
          <View>
            <WalletCard isLoading={isLoading} isFetching={isFetching}>
              <View className='mt-10'>
                <Text className='text-sm font-semibold mb-4'>{t("Finance.My_Referrals.point")}</Text>
                <Text className='text-3xl font-black'>$ {orderList?.data?.balance?.referralBalance}.00</Text>
                <Text className='text-sm font-semibold'>{t("Finance.My_Referrals.equil")} RM {orderList?.data?.balance?.referralBalance}</Text>
                <Text className='text-sm font-semibold mt-3'>{orderList?.data?.balance?.referralBalance} {t("Finance.My_Referrals.Referrals")}</Text>
              </View>
            </WalletCard>

            <View className='mt-4 gap-3'>
              <View style={{backgroundColor: "#EBFFEC"}} className='flex-row items-center justify-between px-3 py-2'>
                <View className='flex-row gap-3 items-center'>
                  <View style={{backgroundColor: "#FFEDEF"}} className='p-2 rounded-md'>
                    <QuestionIcon />
                  </View>
                  <Text className='text-base font-medium'>{t("Finance.My_Referrals.work")}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push(APP_ROUTES.HOWWORKS)}>
                  <GreaterThan />
                </TouchableOpacity>
              </View>

              <View style={{backgroundColor: "#F9F9F9"}} className='flex-row items-center justify-between px-3 py-2'>
                <View className='flex-row gap-3 items-center'>
                  <View style={{backgroundColor: "#FFEDEF"}} className='p-2 rounded-md'>
                    <CreditIcon />
                  </View>
                  <Text className='text-base font-medium'>{t("Finance.My_Referrals.Credit_history")}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push(APP_ROUTES.CREDITHISTORY)}>
                  <GreaterThan />
                </TouchableOpacity>
              </View>
            </View>

            <View className='flex-row justify-between items-center mt-5'>
              <TouchableOpacity className='flex-row items-center gap-3 rounded-full justify-center py-3 px-5' style={{backgroundColor: COLORS.light.primary}} onPress={() => router.push(APP_ROUTES.REFEREARN)} >
                <ReferIcon color="#FAFAFA" />
                <Text className='text-white font-bold capitalize text-base'>{t("button.Refer_Earn")}</Text>
              </TouchableOpacity>

              <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3 border px-5' style={{borderColor: COLORS.light.primary}} onPress={() => router.push(APP_ROUTES.REDEEM)} >
                <RedeemIcon color="#F15A22" />
                <Text className='text-white font-bold capitalize text-base' style={{color: COLORS.light.primary }}>{t("button.Redeem")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
  
      default:
        return null;
    }
}

export default DisplayTabFinance

const styles = StyleSheet.create({
  plus: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.light.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
}
})