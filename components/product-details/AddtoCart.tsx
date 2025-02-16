import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Cart from '@/components/icons/cart';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/theme/colors';
import commonStyles from '../styles/common';
import { decrementQuantity, getCart, incrementQuantity, saveCart } from '@/lib/cart';
import { useTranslation } from 'react-i18next';
import BottomSheet from '@gorhom/bottom-sheet';

const AddtoCart = ( {setModalVisible, item, bottomSheetRef}: { setModalVisible: Dispatch<SetStateAction<boolean>>, item: any, bottomSheetRef: React.MutableRefObject<BottomSheet> }) => {

    const [cart, setCart] = useState<any[]>([]);
    const {t} = useTranslation();
 
    useEffect(() => {
        const fetchCart = async () => {
            let data = await getCart()
            setCart(data)
        }

        fetchCart()
    })


  return (
    <View className='justify-center items-center '>
      <View className='mb-4 items-center'>
            <Text className='font-bold text-2xl absolute z-20 text-white top-7 ps-3'>
                {cart?.find((product: any) => product?.id === item?.id)?.count || 1}
            </Text>
            <Cart />
      </View>

      <View className='flex-row items-center gap-8 mb-10 rounded-full bg-gray-100 px-8 py-5' style={commonStyles.shadow}>
        <TouchableOpacity onPress={() => decrementQuantity(item)}>
            <AntDesign name="minuscircleo" size={24} color="black" />
        </TouchableOpacity>

        <Text className='font-bold text-2xl'>
            {cart?.find((product: any) => product.id === item.id)?.count || 1}
        </Text>

        <TouchableOpacity onPress={() => incrementQuantity(item)}>
            <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

        <TouchableOpacity className='flex flex-row items-center gap-5 rounded-full justify-center py-3' style={{backgroundColor: COLORS.light.primary, width: "65%"}} onPress={() => {
          bottomSheetRef.current?.expand(); 
          setModalVisible(true)}}>
            <Ionicons
              name="cart-outline"
              size={24}
              color="#fff"
            />
            <Text className='text-white font-bold capitalize text-base'>{t('button.done')}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddtoCart

const styles = StyleSheet.create({})