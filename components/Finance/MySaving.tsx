import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import TransactionIcon from '@/components/icons/Transaction'
import commonStyles from '../styles/common';
import { COLORS } from '@/theme/colors';
import BarChartComp from '../common/Chart/BarChart';
import SavingHistory from './SavingHistory';

const MySaving = ({savingData, showActivityStatus, selectReportDate, savingHistory, isLoadingsaving, isFetchingsaving, errorsaving}: 
    {savingData: any, showActivityStatus: () => void, selectReportDate: () => void, savingHistory: any, isLoadingsaving: boolean, isFetchingsaving: boolean, errorsaving: boolean}) => {
    const {t} = useTranslation();
    const listRef = useRef(null);

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
            <TouchableOpacity className='border border-purple-300 bg-purple-100 px-3 py-2 rounded-md' onPress={showActivityStatus}>
                <Text className='text-purple-700 text-sm font-bold'>{t("button.Activity_Status")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: COLORS.light.primary}} className='px-3 py-2 rounded-md' onPress={selectReportDate}>
                <Text className='text-white text-sm font-bold'>{t("button.report")}</Text>
            </TouchableOpacity>
        </View>

        <View className='mt-10 mb-7'>
            <BarChartComp showData={savingHistory?.data} />
        </View>

        <SavingHistory isLoadingsaving={isLoadingsaving} isFetchingsaving={isFetchingsaving} errorsaving={errorsaving} savingHistory={savingHistory} />
        
    </View>
  )
}

export default MySaving

const styles = StyleSheet.create({})