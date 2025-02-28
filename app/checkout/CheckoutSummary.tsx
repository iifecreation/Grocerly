import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { getCart } from '@/lib/cart';
import RoundedIcon from '@/components/common/Button-icon/Rounded-Icon';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import commonStyles from '@/components/styles/common';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';
import { getOrderDetails } from '@/lib/orderDetails';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const CheckoutSummary = () => {
    const {t} = useTranslation();
    const [cart, setCart] = useState<any[]>([]);
    const listRef = useRef(null);
    const router = useRouter()
    const order = getOrderDetails()

    useEffect(() => {
        const fetchCart = async () => {
            let data = await getCart()
            setCart(data)
        }
        fetchCart().then()
      })

    const totalPrice = cart.reduce((total, product) => total + product.totalPrice, 0);

    return (
        <ScreenWrapper background={COLORS.light.primary} >
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t('Checkout.Checkout_Summary')} />
            </ArchBorder>

            <ScrollView style={styles.headerDesc} showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight}}>
                    <Text className='font-black text-base mb-5'>{t("Checkout.Checkout_Summary")}</Text>
                    
                    <FlatList 
                        ref={listRef}
                        data={cart}
                        keyExtractor={(_, id) => id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{rowGap: 10}}
                        renderItem={(item: any) => (
                            <View style={commonStyles.shadow2} className='w-full py-4 px-3 flex-row items-center justify-between rounded-lg mb-3 bg-white gap-3' >
                                <View className='w-[70] h-[70]'>
                                    <Image source={{uri: item?.item?.image?.url}} className='w-full h-full object-cover rounded-md' />
                                </View>
                        
                                <View className='flex-1'>
                                    <Text className='text-gray-500'>{item?.item?.productLabel}</Text>
                                    <Text className='font-bold text-lg'>{item?.item?.name}</Text>
                                </View>
                        
                                <Text className='text-base font-black'>$ {item?.item?.totalPrice}.00</Text>
                            </View>
                        )}
                    />

                    <View className='mb-5 mt-5'>
                        <Text className='font-bold text-base mb-5'>{order?.type}</Text>

                        {order?.type == "Delivery Address" ?
                        (
                            <View style={commonStyles.shadow2} className='px-3 py-3 rounded-lg bg-white'>
                                <View className='flex-row items-center gap-3 mb-3 ' >
                                    <RoundedIcon color="#FFEDEF">
                                        <EvilIcons name="location" size={24} color="#EE3248" />
                                    </RoundedIcon>
                                    
                                    <Text className='font-medium text-sm capitalize flex-1'>{order?.address.address1}, {order?.address.address2} {order?.address.city} {order?.address.state}</Text>
                                </View>

                                <View className='flex-row items-center gap-3 mb-3 ' >
                                    <RoundedIcon color="#FFF0EB">
                                        <FontAwesome6 name="house" size={15} color="#F15A22" />
                                    </RoundedIcon>
                                    
                                    <Text className='font-medium text-sm capitalize flex-1'>{order?.address.type}</Text>
                                </View>
                            </View>
                        )
                        :
                        (
                            <View style={commonStyles.shadow2} className='px-3 py-3 rounded-lg bg-white'>
                                <Text className='font-bold text-lg capitalize mb-3'>{order?.address.stores}</Text>
                                <View className='flex-row items-center gap-3 mb-3 ' >
                                    <RoundedIcon color="#FFEDEF">
                                        <EvilIcons name="location" size={24} color="#EE3248" />
                                    </RoundedIcon>
                                    
                                    <Text className='font-medium text-base flex-1'>{order?.address.address}</Text>
                                </View>
                            </View>
                        )
                        }
                    </View>

                    <View className='flex-row items-center justify-between mb-5'>
                        <Text className='font-bold text-base'>{t("Checkout.Delivery.delivery_date")}:</Text>
                        <Text className='font-medium'>{order?.date}</Text>
                    </View>

                    <View className='flex-row items-center justify-between'>
                        <Text className='font-bold text-base'>{t("Checkout.Delivery.Delivery_Time")}:</Text>
                        <Text className='font-medium'>{order?.time?.hour}:{order?.time?.minute} {order?.time?.ampm}</Text>
                    </View>
                </View>
                
                <View className='mt-10 bg-gray-100 pt-10 pb-5' style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight,borderTopRightRadius: 50, borderTopLeftRadius: 50}}>

                    <View className='border-b border-red-500'>
                    <View className='flex flex-row items-center justify-between mb-3'>
                        <Text className='font-bold'>{t("product.cart.Processing-fee")}</Text>
                        <Text className='font-black'>6%</Text>
                    </View>

                    <View className='flex flex-row items-center justify-between mb-3'>
                        <Text className='font-bold'>{t("product.cart.Discount")}</Text>
                        <Text className='font-black'>3%</Text>
                    </View>

                    <View className='flex flex-row items-center justify-between mb-3'>
                        <Text className='font-bold'>{t("product.cart.Delivery-fees")}</Text>
                        <Text className='font-black'>20%</Text>
                    </View>
                    </View>

                    <View className='flex flex-row items-center justify-between mt-5'> 
                    <Text className='font-bold text-base'>{t("product.cart.Total-cost")}</Text>
                    <Text className='font-black text-lg'>{totalPrice}</Text>
                    </View>

                    <TouchableOpacity className='flex flex-row items-center gap-5 rounded-full justify-center py-3 mt-10 mb-7 w-full' style={{backgroundColor: COLORS.light.primary}} onPress={() => router.push(APP_ROUTES.PAYMENT)} >
                        <MaterialIcons name="shopping-cart-checkout" size={24} color="white" />
                        <Text className='text-white font-bold capitalize text-base'>{t("button.Proceed-payment")}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
        </ScreenWrapper>
    )
}

export default CheckoutSummary

const styles = StyleSheet.create({
  headerDesc: {
    flex: 1,
    minHeight: 0,
    width: "100%"
  }
});

