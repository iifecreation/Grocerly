import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useMemo, useRef, } from 'react'
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
import NoCreditIcon from '@/components/icons/NocreditHistory'
import commonStyles from '@/components/styles/common';
import EarnIcon from "@/components/icons/Earn";

const CreditHistory = () => {
    const {t} = useTranslation();
    const listRef = useRef(null);
    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: history,
    } = useQuery({
        queryKey: [QUERY_ENUM.CREDITHISTORY],
        queryFn: async () => {
            return await axiosInstance.get(API_ROUTES.CREDITHISTORY);
        },
    });

    const historyList = useMemo(() => history?.data, [history]);
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t("Finance.Credit_History.title")} />
            </ArchBorder>

            <View style={styles.headerDesc}>
                {
                    isLoading || isFetching ? 
                        (<ActivityIndicator size='large' className='items-center justify-center w-full' />)
                    :
                    error 
                    ? (
                        <View>
                            <Text className='text-base font-bold text-center'>{t("Finance.Credit_History.error")}</Text>
                        </View>
                        )
                    :
                    historyList?.data?.length == 0 ?
                        (
                            <View className='items-center w-full'>
                                <NoCreditIcon />
                                <Text className='text-base font-bold text-center mb-2 mt-8'>{t("Finance.Credit_History.none.title")}</Text>
                                <Text className='text-sm font-medium text-center'>{t("Finance.Credit_History.none.desc")}</Text>
                            </View>
                        )
                    :
                    (
                        <FlatList
                            ref={listRef}
                            data={historyList?.data}
                            numColumns={1}
                            keyExtractor={(_, id) => id.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{columnGap: 10, rowGap: 15, width: "100%", flex: 1 }}
                            renderItem={(item) => {
                                return (
                                <View style={commonStyles.shadow2} className='w-full flex-row justify-between items-center gap-3 px-3 py-4 rounded-lg'>
                                    <View style={{backgroundColor: "#FFEDEF"}} className='p-2 rounded-md'>
                                        <EarnIcon />
                                    </View>
                                    <View className='flex-1 '>
                                        <Text className='text-base font-bold capitalize mb-1'>{item?.item?.description}</Text>
                                        <Text className='text-xs font-medium'>{new Date(item?.item?.createdAt).toLocaleDateString()}</Text>
                                    </View>
                                    <Text className='font-bold text-lg' style={{color: COLORS.light.primary}}>${item?.item?.amount}</Text>
                                </View>
                                )
                            }}  
                        />
                    )
                }
        
            </View>

        </View>
    </ScreenWrapper>
  );
}

export default CreditHistory

const styles = StyleSheet.create({
  headerDesc: {
    flex: 1,
    width: "100%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
});