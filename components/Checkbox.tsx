import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import { COLORS } from '@/theme/colors'

const Checkbox = ({selectedValue, setSelectedValue, text, value}: {selectedValue: string, setSelectedValue: React.Dispatch<React.SetStateAction<string>>, text: string, value: string}) => {
  return (
    <View className='flex flex-row gap-2 items-center'>
        <RadioButton
        value={value}
        status={ selectedValue === value ? 'checked' : 'unchecked' }
        onPress={() => setSelectedValue(value)}
        uncheckedColor='#6b7280'
        color={COLORS.light.primary}
        />
        <Text className='text-gray-500'>{text}</Text>
    </View>
  )
}

export default Checkbox

const styles = StyleSheet.create({})