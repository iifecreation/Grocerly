import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Warn from "@/components/icons/Warn"
import { useTranslation } from 'react-i18next';
import commonStyles from '@/components/styles/common';

interface PickTimeType {
    hour: string
    minute: string
    ampm: string
    setAmpm: Dispatch<SetStateAction<string>>
    setHour: Dispatch<SetStateAction<string>>
    setMinute: Dispatch<SetStateAction<string>>
}

const CheckoutTime: React.FC<PickTimeType> = ({hour, minute, ampm, setAmpm, setHour, setMinute}) => {
    const {t} = useTranslation();

    const handleAMPMSelect = (selection: string) => {
        setAmpm(selection);
    };

  return (
    <View className='mt-7 rounded-xl py-4 px-3 bg-white' style={commonStyles.shadow2}>
        <Text className='font-bold mb-6 text-lg'>{t("Checkout.Delivery.Delivery_Time")}</Text>

        <View className='flex-row items-center gap-4'>
            <Warn />
            <Text className='text-gray-500 font-medium text-sm'>{t("Checkout.Delivery.Delivery_Time_desc")}</Text>
        </View>

        <View className='flex-row items-center justify-between mt-3'>
            <Text className='font-bold'>{t("Checkout.Delivery.Time")}</Text>
        
            <View className="flex-row items-center mr-1 rounded-" style={{backgroundColor: "#FFEDEF"}}>
                <TextInput
                className="w-12 h-10 text-center text-xl font-bold"
                value={hour}
                keyboardType="numeric"
                maxLength={2}
                onChangeText={setHour}
                />
                <Text className="text-xl mx-1 font-bold">:</Text>
                <TextInput
                className="w-12 h-10 text-center text-xl font-bold"
                value={minute}
                keyboardType="numeric"
                maxLength={2}
                onChangeText={setMinute}
                />
            </View>

            {/* AM/PM Buttons */}
            <View className="flex-row items-center p-1" style={{backgroundColor: "#FFEDEF"}}>
                <TouchableOpacity
                className={`w-11 h-9 justify-center items-center  ${ampm === 'AM' ? 'bg-white' : ''}`}
                onPress={() => handleAMPMSelect('AM')}
                >
                <Text className=" font-bold">AM</Text>
                </TouchableOpacity>

                <TouchableOpacity
                className={`w-11 h-9 justify-center items-center  ${ampm === 'PM' ? 'bg-white' : ''}`}
                onPress={() => handleAMPMSelect('PM')}
                >
                <Text className="font-bold">PM</Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
  )
}

export default CheckoutTime

const styles = StyleSheet.create({})