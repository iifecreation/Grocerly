import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Input = ({title}: {title: string}) => {
  return (
    <View className=''>
      <Text className='text-gray-500 mb-2 text-sm'>{title}</Text>
      <TextInput className='border border-gray-300 rounded-full text-sm py-2 px-2'/>
    </View>
  )
}

export default Input