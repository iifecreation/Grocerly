import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import SearchComponent from '../common/search/search'
import commonStyles from '../styles/common'
import { COLORS } from '@/theme/colors'
import CartCard from '../common/cards/CartCard'
import { deleteAllProduct } from '@/lib/cart'
import { SAFE_AREA_PADDING } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import Discount from '../common/Discount/Discount'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router'
import { APP_ROUTES } from '@/contants/app-routes'

const CartProduct = ({cart}: {cart: any[]}) => {
  const listRef = useRef(null);
  const {t} = useTranslation();
  const router = useRouter()

  const showProduct= (item: any ) => {
    return (
    <View style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight, flex: 1}}>
      <CartCard item={item} />
    </View>
    ) 
  }

  const totalPrice = cart.reduce((total, product) => total + product.totalPrice, 0);

  const CompleteCheckOut = () => {
    // const address = true

    // if(address){
      router.push(APP_ROUTES.CHECKOUT)
      // return
    // }


  }
  
  return (
    <ScrollView className='w-full'>
      <View style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight}}>
        <SearchComponent placeholder={t("product.cart.input-placeholder")} />
      </View>
    
      <View className='flex-row justify-between items-center mt-3' style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight}}>
        <Text className='font-bold text-lg'>{cart?.length} {t("product.cart.item-incart")}</Text>
        <TouchableOpacity onPress={() => deleteAllProduct()}>
          <Text style={[commonStyles.color, {borderBottomColor: COLORS.light.primary}]} className='font-medium border-b-2'>
            {t("product.cart.clear")}
          </Text>
        </TouchableOpacity>
      </View>

      <View className='mt-3'>
        <FlatList
          ref={listRef}
          numColumns={1}sub-title
          data={cart}
          keyExtractor={(_, id) => id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{rowGap: 10}}
          renderItem={showProduct}
        />

        <View className='flex-1 mt-5'>
          <View style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight, width: "100%"}} >
            <Discount />
          </View>

          <View className='mt-5 bg-gray-100 pt-10 pb-5' style={{paddingHorizontal: SAFE_AREA_PADDING.paddingRight, borderTopRightRadius: 50, borderTopLeftRadius: 50}}>

            <View className='border-b border-red-500'>
              <View className='flex flex-row items-center justify-between mb-3'>
                <Text className='font-bold'>{t("product.cart.Processing-fee")}</Text>
                <Text className='font-black'>6%</Text>
              </View>

              <View className='flex flex-row items-center justify-between mb-3'>
                <Text className='font-bold'>{t("product.cart.Discount")}</Text>
                <Text className='font-black'>3%</Text>
              </View>

              <View className='flex flex-row items-center justify-between mb-3'>
                <Text className='font-bold'>{t("product.cart.Delivery-fees")}</Text>
                <Text className='font-black'>20%</Text>
              </View>
            </View>

            <View className='flex flex-row items-center justify-between mt-5'> 
              <Text className='font-bold text-base'>{t("product.cart.Total-cost")}</Text>
              <Text className='font-black text-lg'>${totalPrice}.00</Text>
            </View>

            <TouchableOpacity className='flex flex-row items-center gap-5 rounded-full justify-center py-3 mt-10 w-full' style={{backgroundColor: COLORS.light.primary}} onPress={CompleteCheckOut}>
              <MaterialIcons name="shopping-cart-checkout" size={24} color="white" />
              <Text className='text-white font-bold capitalize text-base'>{t("button.checkout")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default CartProduct
