import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/theme/colors'

interface CustomButtonProps{
    children: React.ReactNode
    navigateProps: () => void
    textProps: string
}

const CustomButton: React.FC<CustomButtonProps> = ({children, navigateProps, textProps}) => {
  return (
    <TouchableOpacity className='flex flex-row items-center gap-5 rounded-full justify-center py-3 mt-6 mb-16 w-full' style={{backgroundColor: COLORS.light.primary}} onPress={navigateProps} >
        {children}
        <Text className='text-white font-bold capitalize text-base'>{textProps}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})