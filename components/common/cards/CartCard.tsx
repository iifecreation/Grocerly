import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import commonStyles from '@/components/styles/common';
import { COLORS } from '@/theme/colors';
import { decrementQuantity, deleteSingleProduct, incrementQuantity } from '@/lib/cart';

const CartCard = ({item}: {item: any}) => {
  
    const {image, productLabel, name, price, count} = item?.item
  return (
    <View style={commonStyles.shadow} className='w-full bg-white py-6 px-4 m-1'>
      <View className='flex-row justify-between items-center'>
            <View className='w-[70] h-[70]'>
                <Image source={{uri: image?.url}} className='w-full h-full object-cover rounded-md' />
            </View>

            <View>
                <Text className='text-gray-500'>{productLabel}</Text>
                <Text className='font-bold text-lg'>{name}</Text>
            </View>

            <Text className='text-base font-black'>MYR {price}</Text>
      </View>
      <View className='flex-row mt-4 items-center justify-between'>
        <TouchableOpacity onPress={() => deleteSingleProduct(item?.item)}>
         <AntDesign name="delete" size={24} color="#00000066" />
        </TouchableOpacity>

        <View className='flex-row gap-5 items-center '>
            <TouchableOpacity style={{backgroundColor: COLORS.light.primary}} className='rounded-md px-2' onPress={() => decrementQuantity(item?.item)}>
                <Text className='text-white font-bold text-xl'>-</Text>
            </TouchableOpacity>
            <Text>{count}</Text>
            <TouchableOpacity style={{backgroundColor: COLORS.light.primary}} className='rounded-md px-2' onPress={() => incrementQuantity(item?.item)}>
                <Text className='text-white font-bold text-xl'>+</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CartCard

const styles = StyleSheet.create({})