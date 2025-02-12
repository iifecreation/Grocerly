import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { SAFE_AREA_PADDING } from '@/utils/utils';

const SearchComponent = ({placeholder}: {placeholder: string}) => {
  return (
    <View className='flex flex-row items-center border border-gray-300 w-full rounded-full p-2 gap-4'>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput placeholder={placeholder} className='w-full' />
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({})