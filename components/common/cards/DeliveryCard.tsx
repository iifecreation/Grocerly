import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundedIcon from '../Button-icon/Rounded-Icon'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useTranslation } from 'react-i18next';
import Warn from "@/components/icons/Warn"
import commonStyles from '@/components/styles/common';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const DeliveryCard = ({data, selectedOrderAddress}: 
    {data: any, selectedOrderAddress: {
        id: string;
        data: never[];
    }}) => {
    const {t} = useTranslation();
   
  return (
    <View className='border border-gray-200 w-full rounded-xl py-4 px-3' style={[{backgroundColor: selectedOrderAddress.id == data.id ? "#0000004D" : "#ffffff" }, commonStyles.shadow2]} >

        <View className='flex-row items-center gap-3 mb-3 w-full'>
            <RoundedIcon color="#FFF0EB">
                <EvilIcons name="location" size={24} color="#F15A22" />
            </RoundedIcon>
            
            <Text className='font-medium text-sm flex-1'>{data.address1}, {data.address2} {data.city} {data.state}</Text>
        </View>

        <View className='flex-row items-center gap-3 mb-3 w-full'>
            <RoundedIcon color="#FFF0EB">
                <FontAwesome6 name="house" size={15} color="#F15A22" />
            </RoundedIcon>

            <Text className='font-medium text-sm capitalize '>{data.type}</Text>
        </View>

        <View className='flex-row items-center mb-3 gap-2 '>
            <RoundedIcon color="#FFEFDD">
                <Fontisto name="flash" size={18} color="#FA8707" />
            </RoundedIcon>
            
            <Text className='font-medium'>{t("Checkout.Delivery.available")}</Text>
        </View>

        <View className='flex-row items-center bg-gray-200 px-2 py-1 gap-3 w-full'>
            <Warn />
            <Text className='text-xs text-gray-500 flex-1'>{t("Checkout.Delivery.delivery_fees")}</Text>
        </View>

    </View>
  )
}

export default DeliveryCard

const styles = StyleSheet.create({})