import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundedIcon from '../Button-icon/Rounded-Icon'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useTranslation } from 'react-i18next';
import Warn from "@/components/icons/Warn"


const DeliveryCard = ({data}: {data: any}) => {
    const {t} = useTranslation();
    
  return (
    <View className='border border-gray-200 w-full rounded-xl py-4 px-3'>
        <Text className='font-bold text-lg capitalize mb-3'>{data.stores}</Text>

        <View className='flex-row items-center gap-3 mb-3 w-full'>
            <RoundedIcon color="#FFEDEF">
                <EvilIcons name="location" size={24} color="#EE3248" />
            </RoundedIcon>
            
            <Text className='font-medium text-base'>{data.address}</Text>
        </View>

        <View className='flex-row items-center mb-3 gap-2 '>
            <Fontisto name="flash" size={18} color="#FA8707" />
            <Text className='font-medium'>{data.available}</Text>
        </View>

        <View className='flex-row items-center bg-gray-200 px-2 py-1 gap-3 w-full'>
            <Warn />
            <Text className='text-xs text-gray-500'>{t("Checkout.Delivery.delivery_fees")}</Text>
        </View>

    </View>
  )
}

export default DeliveryCard

const styles = StyleSheet.create({})