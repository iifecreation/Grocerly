import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import TransactionIcon from '@/components/icons/Transaction'
import commonStyles from '../styles/common';
import { COLORS } from '@/theme/colors';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import BarChartComp from '../common/Chart/BarChart';

const MySaving = ({savingData}: {savingData: any}) => {
    const {t} = useTranslation();
    const listRef = useRef(null);

    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: saving,
      } = useQuery({
        queryKey: [QUERY_ENUM.SAVINGHISTORY],
        queryFn: async () => {
          return await axiosInstance.get(API_ROUTES.SAVINGHISTORY);
        },
      });
    
      const savingHistory = useMemo(() => saving?.data, [saving]);
      console.log(savingHistory);

    const mysavingCardData = [
        {
            id: 1,
            title: t("Finance.mySaving.card1"),
            icon: <TransactionIcon color="#295200" />,
            background: "#EDFEDC",
            amount: savingData?.balance?.savingsBalance
        },
        {
            id: 2,
            title: t("Finance.mySaving.card2"),
            icon: <TransactionIcon color="#EE3248" />,
            background: "#FFEDEF",
            amount: savingData?.balance?.expenseBalance
        },
    ]
  return (
    <View>
        <FlatList
            ref={listRef}
            data={mysavingCardData}
            numColumns={2}
            keyExtractor={(_, id) => id.toString()}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{justifyContent: "space-between", columnGap: 20,}}
            contentContainerStyle={{ rowGap: 15, width: "100%", flex: 1 }}
            renderItem={({item}) => {
                return (
                <View style={[commonStyles.shadow2, {backgroundColor: item.background}]} className='px-3 flex-1 py-3 rounded-lg items-center'>
                    {item.icon}
                    <Text className='mt-3 mb-1 text-gray-600 font-medium text-sm'>{item.title}</Text>
                    <Text className='text-lg font-semibold text-gray-900'>$ {item.amount}.00</Text>
                </View>
                )
            }}  
        />

        <View className='flex-row justify-end w-full items-center gap-3 mt-5'>
            <TouchableOpacity className='border border-purple-300 bg-purple-100 px-3 py-2 rounded-md'>
                <Text className='text-purple-700 text-sm font-bold'>{t("button.Activity_Status")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: COLORS.light.primary}} className='px-3 py-2 rounded-md'>
                <Text className='text-white text-sm font-bold'>{t("button.report")}</Text>
            </TouchableOpacity>
        </View>

        <View className='mt-10 mb-7'>
            <BarChartComp />
        </View>
    </View>
  )
}

export default MySaving

const styles = StyleSheet.create({})