import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import GreaterThan from "@/components/icons/greaterThan";

const Payment = () => {
    const {t} = useTranslation();
    const listRef = useRef(null);
    
    const paymentDetails= [
        {
            id: 1,
            name: t("Payment.wallet"),
            image: require("@/assets/payment/1.png")
        },
        {
            id: 2,
            name: t("Payment.bank"),
            image: require("@/assets/payment/2.png")
        },
        {
            id: 3,
            name: t("Payment.BoostPay"),
            image: require("@/assets/payment/3.png")
        },
        {
            id: 4,
            name: t("Payment.Grab_Pay"),
            image: require("@/assets/payment/4.png")
        },
        {
            id: 5,
            name: t("Payment.MasterCard"),
            image: require("@/assets/payment/5.png")
        },
        {
            id: 6,
            name: t("Payment.Touchngo"),
            image: require("@/assets/payment/6.png")
        },
    ]

    return (
        <ScreenWrapper background={COLORS.light.primary} >
        <View className="flex-1 bg-white">
            <ArchBorder>
                <MainPageHeader name={t('Payment.title')} />
            </ArchBorder>

            <View style={styles.headerDesc}>

                <Text className='font-black text-base mb-3' >{t("Payment.desc")}</Text>

                <FlatList
                    ref={listRef}
                    data={paymentDetails}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 20}}
                    style={{marginBottom: 50}}
                    renderItem={(item: any) => (
                        <TouchableOpacity className='flex-row items-center justify-between rounded-xl bg-gray-200 py-4 px-3'>
                            <View className='flex-row items-center gap-3'>
                                <Image source={item?.item?.image} style={{width: 50, height: 50, objectFit: "contain"}} />

                                <View>
                                    <Text className='text-lg mb-1'>{item?.item?.name}</Text>
                                    <View className='flex-row items-center gap-2'>
                                        <View className='bg-gray-500 w-[7] h-[7] rounded-full'></View>
                                        <View className='bg-gray-500 w-[7] h-[7] rounded-full'></View>
                                        <View className='bg-gray-500 w-[7] h-[7] rounded-full'></View>
                                        <View className='bg-gray-500 w-[7] h-[7] rounded-full'></View>
                                    </View>
                                </View>
                            </View>

                            <GreaterThan />

                        </TouchableOpacity>
                    )}

                />

            </View>
        </View>
        </ScreenWrapper>
    )
}

export default Payment

const styles = StyleSheet.create({
  headerDesc: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    flex: 1,
    minHeight: 0,
  }
});
