import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '@/theme/colors'

const CustomTwoButton = ({moveButton, moveButtonTwo, icon1, icon2, text1, text2}: 
    {moveButton: () => void, moveButtonTwo: () => void, icon1: ReactNode, icon2: ReactNode, text1: string, text2: string }) => {
  return (
    <View className='flex-row justify-between items-center mt-5 gap-3'>
        <TouchableOpacity className='flex-row items-center gap-3 rounded-full justify-center py-3 px-5' style={{backgroundColor: COLORS.light.primary}} onPress={moveButton} >
            {icon1}
            <Text className='text-white font-bold capitalize text-base'>{text1}</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3 border px-5' style={{borderColor: COLORS.light.primary}} onPress={moveButtonTwo} >
            {icon2}
            <Text className='text-white font-bold text-base' style={{color: COLORS.light.primary }}>{text2}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CustomTwoButton

const styles = StyleSheet.create({})