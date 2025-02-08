import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { getCart } from '@/lib/cart';
import EmptyCart from '@/components/cart/EmptyCart';
import CartProduct from '@/components/cart/CartProduct';

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
    width: "100%"
  }
});