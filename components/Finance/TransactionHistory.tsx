import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/contants/api-routes';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import TransactionIcon from '@/components/icons/Transaction'
import NoTransactionIcon from '@/components/icons/NoTransaction'
import commonStyles from '../styles/common';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/theme/colors';

const TransactionHistory = () => {
    const listRef = useRef(null);
    const {t} = useTranslation();
    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: history,
    } = useQuery({
        queryKey: [QUERY_ENUM.TRANSACTIONHISTORY],
        queryFn: async () => {
            return await axiosInstance.get(API_ROUTES.TRANSACTIONHISTORY);
        },
    });

    const historyList = useMemo(() => history?.data, [history]);

    return (
    <View className='w-full'>
        {
            isLoading || isFetching ? 
                (<ActivityIndicator size='large' className='items-center justify-center w-full' />)
            :
            error 
            ? (
                <View>
                    <Text className='text-base font-bold text-center'>{t("Finance.Transaction_Details.error")}</Text>
                </View>
                )
            :
            historyList?.data?.data.length == 0 ?
                (
                    <View className='w-full items-center justify-center mt-8'>
                        <View className='mb-5'>
                            <NoTransactionIcon />
                        </View>
                        <Text className='text-base font-bold text-center mb-2'>{t("Finance.Transaction_Details.none.title")}</Text>
                        <Text className='text-sm font-medium text-center'>{t("Finance.Transaction_Details.none.desc")}</Text>
                    </View>
                )
            :
                (
                    <>
                        <View className='flex-row justify-between items-center mb-4'>
                            <Text className='font-bold text-base'>{t("Finance.Transaction_History")}</Text>
                            <TouchableOpacity>
                                <Text className='font-medium text-sm border-b' style={{color: COLORS.light.primary, borderBottomColor: COLORS.light.primary}}>
                                {t("Finance.All_Transaction_History")}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            ref={listRef}
                            data={historyList?.data?.data}
                            numColumns={1}
                            keyExtractor={(_, id) => id.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{columnGap: 10, rowGap: 15, width: "100%", flex: 1 }}
                            renderItem={(item) => {
                                return (
                                <View style={commonStyles.shadow2} className='w-full flex-row justify-between items-center gap-3 px-3 py-4 rounded-lg'>
                                    <TransactionIcon />
                                    <View className='flex-1 '>
                                        <Text className='text-base font-bold capitalize mb-2'>{item?.item?.description}</Text>
                                        <Text className='text-xs font-medium mb-2'>{t("Finance.Transaction_Details.id")} {item?.item?.transactionId}</Text>
                                        <Text className='text-xs font-medium'>{t("Finance.Transaction_Details.date")} {new Date(item?.item?.createdAt).toLocaleDateString()}</Text>
                                    </View>
                                    <Text className='font-bold text-lg' style={{color: COLORS.light.primary}}>${item?.item?.amount}</Text>
                                </View>
                                )
                            }}  
                        />
                    </>
                )
        }
        
    </View>
    )
    }

export default TransactionHistory

const styles = StyleSheet.create({})