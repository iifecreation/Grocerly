import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import SearchComponent from '../common/search/search'
import commonStyles from '../styles/common'
import { COLORS } from '@/theme/colors'
import CartCard from '../common/cards/CartCard'
import { deleteAllProduct } from '@/lib/cart'

const CartProduct = ({cart}: {cart: any[]}) => {
    const listRef = useRef(null);

    const showProduct= (item: any ) => {
        return (<CartCard item={item} />) 
    }
  
  return (
    <View className='w-full'>
      <SearchComponent placeholder="Search For Products In Cart" />
    
      <View className='flex-row justify-between items-center mt-5'>
        <Text className='font-bold text-lg'>{cart?.length} items in your cart</Text>
        <TouchableOpacity onPress={() => deleteAllProduct()}>
          <Text style={[commonStyles.color, {borderBottomColor: COLORS.light.primary}]} className='font-medium border-b-2'>Clear Cart</Text>
        </TouchableOpacity>
      </View>

      <View className='mt-7'>
         <FlatList
            ref={listRef}
            numColumns={1}
            data={cart}
            keyExtractor={(_, id) => id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{rowGap: 10}}
            renderItem={showProduct}
          />
      </View>
    </View>
  )
}

export default CartProduct

const styles = StyleSheet.create({})