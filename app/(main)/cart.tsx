import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { getCart } from '@/lib/cart';
import EmptyCart from '@/components/cart/EmptyCart';
import CartProduct from '@/components/cart/CartProduct';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
        let data = await getCart()
        setCart(data)
    }
    fetchCart().then()
  })

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name="Cart" />
        </ArchBorder>

        <View style={styles.headerDesc}>
          {cart.length < 1 ? <View style={{flex: 1}}><EmptyCart /></View> : <CartProduct cart={cart} /> }

          <View></View>

          <View style={styles.btn}>
            <TouchableOpacity className='flex flex-row items-center gap-5 rounded-full justify-center py-3 w-full ' style={{backgroundColor: COLORS.light.primary}}>
              <MaterialIcons name="shopping-cart-checkout" size={24} color="white" />
              <Text className='text-white font-bold capitalize text-base'>Complete checkout</Text>
            </TouchableOpacity>
          </View>
          
        </View>

      </View>
    </ScreenWrapper>
  );
}

export default Cart

const styles = StyleSheet.create({
  headerDesc: {
    position: "absolute",
    flex: 1,
    top: 150,
    zIndex: 10,
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    width: "100%",
    height: height * 0.7
  },
  btn: {
    position: "absolute",
    width: width,
    backgroundColor: "#fff",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    display: "flex",
    justifyContent: "center"
  }
});