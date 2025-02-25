import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { COLORS } from '@/theme/colors'
import { useTranslation } from 'react-i18next';
import GreaterThan from "@/components/icons/greaterThan"
import WalletCard from './WalletCard';
import TransactionIcon from '@/components/icons/Transaction'
import SavingHistory from './SavingHistory';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { QUERY_ENUM } from '@/contants';
import { useQuery } from '@tanstack/react-query';


const GenerateReport = ({selectedDate, isLoading, isFetching, orderList, isLoadingsaving, isFetchingsaving, errorsaving, savingHistory, cancelGenerate}: 
    {selectedDate: string, isLoading: boolean, isFetching: boolean, orderList: any, isLoadingsaving: boolean, isFetchingsaving : boolean, errorsaving : boolean, savingHistory: any, cancelGenerate: () => void}) => {

    const {t} = useTranslation();
    const {
        data: Chart,
    } = useQuery({
        queryKey: [QUERY_ENUM.SAVINGCHART],
        queryFn: async () => {
            return await axiosInstance.get(API_ROUTES.SAVINGCHART);
        },
    });
    
    const savingData = useMemo(() => Chart?.data, [Chart]);
    const dayReport = savingData?.data?.filter((item: any) => item.date === selectedDate)
    
  return (
    <View>
        <View className='flex-row justify-between items-center mt-3 mb-5'>
            <TouchableOpacity className='px-3 py-2 rounded-md' onPress={cancelGenerate} >
                <GreaterThan />
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: COLORS.light.primary}} className='px-3 py-2 rounded-md' >
                <Text className='text-white text-sm font-bold'>{t("button.report")}</Text>
            </TouchableOpacity>
        </View>

        <WalletCard isLoading={isLoading} isFetching={isFetching}>
            <View className='mt-5'>
                <View className='mb-5 items-center'>
                    <TransactionIcon color="#000000" />
                </View>
                <Text className='text-sm font-semibold mb-3'>{t("Finance.mySaving.card1")}</Text>
                <Text className='text-3xl font-black'>$ {dayReport[0]?.totalSavings}.00</Text>
                <Text className='text-sm font-semibold'>
                    {`${new Date(selectedDate).toLocaleString('default', { month: 'long' }) } ${new Date(selectedDate).getDate()}, ${new Date(selectedDate).getFullYear()}`}
                </Text>
            </View>
        </WalletCard>

        <SavingHistory isLoadingsaving={isLoadingsaving} isFetchingsaving={isFetchingsaving} errorsaving={errorsaving} savingHistory={savingHistory} />
    </View>
  )
}

export default GenerateReport

const styles = StyleSheet.create({})