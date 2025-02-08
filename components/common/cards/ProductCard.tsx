import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { APP_ROUTES } from '@/contants/app-routes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { COLORS } from '@/theme/colors';
import commonStyles from '@/components/styles/common';
import { getCart, saveCart } from '@/lib/cart';

const ProductCard = ({item}: {item: any}) => {

    const router = useRouter()

    const addToCart = async () => {
        const cart = await getCart();

        // Check if the product is already in the cart
        const isProductInCart = cart.some((product: any) => product.id === item.id);

        if (isProductInCart) {
            // If the product is already in cart, show a toast
            Toast.show({
              type: 'info',
              text1: 'Product already in cart',
              text2: 'This product is already in your cart.',
            });
          } else {
            // If not in cart, add it
            const updatedCart = [...cart, { ...item, count: 1 }];

            // Save the updated cart to AsyncStorage
            await saveCart(updatedCart);
            Toast.show({
                type: 'success',
                text1: "Add to cart",
                text2: "This Item has been added successfully"
            });
          }
    }

  return (
    <View className='w-1/2' style={commonStyles.shadow}>
        <View style={styles.itemContainerInner} className='w-full'>
            <TouchableOpacity onPress={() => router.push({
                pathname: APP_ROUTES.PRODUCT_DETAILS,
                params: {
                    id: item?.id
                }
            })}>
                <Image source={{uri: item?.image?.url}} className='w-full h-[150] rounded-lg object-cover' />
            </TouchableOpacity>

            <View className='mt-4' >
                <Text className='text-gray-500 capitalize text-sm'>{item?.category?.name}</Text>
                <Text className='text-black font-bold capitalize text-base'>{item?.name}</Text>
                <Text className='text-black text-base mb-2'>Quantity: {item?.inventory?.quantity}g</Text>

                <View className='flex flex-row justify-between items-center'>
                    <Text className='font-bold text-base' style={commonStyles.color}>MYR {item?.price}</Text>

                    <TouchableOpacity style={styles.cartBtn} className='flex items-center justify-center' onPress={addToCart}>
                        <Ionicons
                            name="cart-outline"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    itemContainerInner: {
        borderColor: "#0000001A",
        borderWidth: 2,
        backgroundColor: "#fff",
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 20
    },
    cartBtn: {
        backgroundColor: COLORS.light.primary,
        width: 28,
        height: 28,
        borderRadius: 50
    },
    
})