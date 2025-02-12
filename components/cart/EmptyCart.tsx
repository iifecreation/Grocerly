import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import EmptyCartIcon from '@/components/icons/empty-cart';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/theme/colors';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');

const EmptyCart = () => {
  const {t} = useTranslation();
  return (
    <View className='items-center w-full h-full ' style={{flex: 1, height: height * 0.73 }}>
      <View className='mb-5'>
        <EmptyCartIcon />
      </View>

      <Text className='font-bold text-base capitalize mb-2'>{t("product.cart.empty.title")}</Text>
      <Text className='text-center font-light mb-3' style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight, lineHeight: 24}}>{t("product.cart.empty.desc")}</Text>

      <TouchableOpacity className='flex flex-row items-center absolute gap-5 rounded-full justify-center py-3' style={{backgroundColor: COLORS.light.primary, width: "100%", bottom: 40}} onPress={() => {
       }}>
          <Ionicons
            name="cart-outline"
            size={24}
            color="#fff"
          />
          <Text className='text-white font-bold capitalize text-base'>{t("button.Shopping")}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default EmptyCart

const styles = StyleSheet.create({})