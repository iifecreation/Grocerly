import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DiscountIcon from '@/components/icons/Discount';
import Warn from '@/components/icons/Warn';
import { useTranslation } from 'react-i18next';

const Discount = () => {
  const {t} = useTranslation();
  return (
    <View className='mt-5'>
      <View className='flex flex-row mb-7 gap-3 w-full'>
        <DiscountIcon />

        <View className='w-1/2'>
          <Text className='text-black font-black mb-2 text-lg'>
            {t("discount.title")}
          </Text>
          <Text className='text-gray-500'>
            {t("discount.desc1")}
          </Text>
        </View>
      </View>

      <View className='flex flex-row items-center justify-between w-full border border-gray-100 gap-8 rounded-lg overflow-hidden'>
        <View className='flex flex-row items-center w-1/2 gap-3 ps-2'>
          <Warn />
          <Text className='text-gray-700 font-normal text-sm'>
            {t("discount.desc2")}
          </Text>
        </View>

        <Image className='w-1/2' source={require("@/assets/images/discount.png")} />
      </View>
    </View>
  )
}

export default Discount

const styles = StyleSheet.create({})