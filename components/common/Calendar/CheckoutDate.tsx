import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Warn from "@/components/icons/Warn";
import commonStyles from '@/components/styles/common';
import CalendarComp from './CalendarComp';

interface PickDate {
  title: string
  desc: string
  selectedDate: string | null
  setSelectedDate: Dispatch<SetStateAction<string>>
};

const CheckoutDate: React.FC<PickDate> = ({title, desc, selectedDate, setSelectedDate}) => {

  // Get today's date in "yyyy-mm-dd" format
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  return (
    <View className='mt-5 rounded-xl py-4 px-3' style={commonStyles.shadow2}>
      <Text className='text-black font-bold mb-6 text-lg'>{title}</Text>
      <View className='flex-row items-center gap-4'>
        <Warn />
        <Text className='text-gray-500 font-medium text-sm'>{desc}</Text>
      </View>

      <CalendarComp setSelectedDate={setSelectedDate} maxDateValue='' minDateValue={formattedToday} />

    </View>
  )
}

export default CheckoutDate

const styles = StyleSheet.create({})