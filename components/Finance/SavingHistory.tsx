import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useTranslation } from 'react-i18next';
import commonStyles from '../styles/common';
import ShopIcon from "@/components/icons/Shop";
import NoTransactionIcon from '@/components/icons/NoTransaction'
import { COLORS } from '@/theme/colors';


const SavingHistory = ({isLoadingsaving, isFetchingsaving, errorsaving, savingHistory}:
    {isLoadingsaving: boolean, isFetchingsaving: boolean, errorsaving: boolean, savingHistory: any}
) => {
    const {t} = useTranslation();
    const listRef = useRef(null);
    
  return (
    <View className='w-full mt-5 pb-5'>
        {
            isLoadingsaving || isFetchingsaving ? 
                (<ActivityIndicator size='large' className='items-center justify-center w-full' />)
            :
            errorsaving 
            ? (
                <View>
                    <Text className='text-base font-bold text-center'>{t("Finance.mySaving.error")}</Text>
                </View>
                )
            :
            savingHistory?.data?.length == 0 ?
                (
                    <View className='w-full items-center justify-center mt-8 mb-10'>
                        <View className='mb-5'>
                            <NoTransactionIcon />
                        </View>
                        <Text className='text-base font-bold text-center mb-2'>{t("Finance.mySaving.none.title")}</Text>
                        <Text className='text-sm font-medium text-center'>{t("Finance.mySaving.none.desc")}</Text>
                    </View>
                )
            :
            (
                <>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-bold text-base'>{t("Finance.mySaving.History")}</Text>
                        <TouchableOpacity>
                            <Text className='font-medium text-sm border-b' style={{color: COLORS.light.primary, borderBottomColor: COLORS.light.primary}}>
                            {t("Finance.All_Transaction_History")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        ref={listRef}
                        data={savingHistory?.data}
                        numColumns={1}
                        keyExtractor={(_, id) => id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{columnGap: 10, rowGap: 15, width: "100%", flex: 1, marginBottom: 4 }}
                        renderItem={(item) => {
                            return (
                            <View style={commonStyles.shadow2} className='w-full flex-row justify-between items-center gap-3 px-3 py-4 rounded-lg'>
                                <View className='items-center justify-center rounded-xl w-10 h-10' style={{backgroundColor: "#FFEDEF"}}>
                                    <ShopIcon />
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
                </>
            )
        }
        
    </View>
  )
}

export default SavingHistory

const styles = StyleSheet.create({})