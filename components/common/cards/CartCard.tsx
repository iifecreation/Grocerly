import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import commonStyles from '@/components/styles/common';
import { COLORS } from '@/theme/colors';
import { decrementQuantity, deleteSingleProduct, incrementQuantity } from '@/lib/cart';
import Delete from '@/components/icons/delete';

// Get screen width
const { width } = Dimensions.get('window');

const CartCard = ({item}: {item: any}) => {
  
  const isTablet = width >= 768;
  const {image, productLabel, name, totalPrice, count} = item?.item

  return (
    <View style={[commonStyles.shadow, {flex: 1}]} className='w-full bg-white py-4 px-3 m-1 flex-wrap' >
      <View className='flex flex-row justify-between items-center w-full gap-3 flex-1'>
        <View style={{ width: isTablet ? 100 : 70, height: isTablet ? 100 : 70 }}>
          <Image source={{uri: image?.url}} className='w-full h-full object-cover rounded-md' />
        </View>

        <View style={{flexShrink: 1}}>
          <Text className='text-gray-500 capitalize'>{productLabel}</Text>
          <Text className='font-bold text-lg capitalize text-wrap'>{name}</Text>
        </View>

        <Text className='text-base font-black'>$ {totalPrice}.00</Text>
      </View>
      <View className='flex-row mt-4 items-center justify-between'>
        <TouchableOpacity onPress={() => deleteSingleProduct(item?.item)}>
         <Delete />
        </TouchableOpacity>

        <View className='flex-row gap-5 items-center '>
            <TouchableOpacity style={{backgroundColor: COLORS.light.primary}} className='rounded-md px-2' onPress={() => decrementQuantity(item?.item)}>
                <Text className='text-white font-bold text-xl'>-</Text>
            </TouchableOpacity>
            <Text className='font-black text-base'>{count}</Text>
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