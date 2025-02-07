import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import FullPageLoader from '@/components/FullPageLoader';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';
import commonStyles from '@/components/styles/common';
import Setting from '@/components/icons/setting';
import Tags from '@/components/icons/tag';
import GreaterThan from '@/components/icons/greaterThan';
import ProductDetailsTab from '@/components/common/tabs/ProductDetailsTab';
import DisplayTabContent from '@/components/common/tabs/displayTabContent';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheetWrapper from '@/components/common/BottomSheet/BottomSheetWrapper';

const tabs = ["Description", "Nutritional Information", "Reviews"];

const ProductDetail = () => {

  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isVisible, setIsVisible] = useState(false);

  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: data,
  } = useQuery({
    queryKey: [QUERY_ENUM.PRODUCT],
    queryFn: async () => {
      return await axiosInstance.get(`${API_ROUTES.FETCH_PRODUCT}/${params.id}`);
    },
  });

  // Function to handle button click and show bottom sheet
  const showBottomSheet = () => setIsVisible(true);
  const {product} = useMemo(() => data?.data, [data]);

  // Helper function to get cart from AsyncStorage
  const getCart = async () => {
    const cart = await AsyncStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  // Helper function to save cart to AsyncStorage
  const saveCart = async (cart: any) => {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToCart = async () => {
      const cart = await getCart();

      // Check if the product is already in the cart
      const isProductInCart = cart.some((item: any) => item.id === product.id);

      if (isProductInCart) {
          // If the product is already in cart, show a toast
          showBottomSheet()
      } else {
        // If not in cart, add it
        const updatedCart = [...cart, product];

        // Save the updated cart to AsyncStorage
        await saveCart(updatedCart);  
        showBottomSheet()   
    }
  }

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      {isLoading || isFetching ? <FullPageLoader /> : null}

      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name="Product Details" />
        </ArchBorder>

        <ScrollView style={styles.headerDesc} className='pb-8'>
          <View className='mb-10'>
            <Image source={{uri: product?.image?.url}} className='w-full h-[200] rounded-lg object-cover' /> 
          </View>

          <View className='flex flex-row items-center mb-2'>
            <Text className='font-bold text-base'>Category: </Text>
            <Text className='capitalize text-base'>{product?.productLabel}</Text>
          </View>

          <Text className='font-bold text-3xl capitalize mb-3'>{product?.name}</Text>
          <Text style={commonStyles.color} className='font-bold text-2xl uppercase mb-4'>MYR {product?.price}</Text>
          
          <View className='flex flex-row items-center mb-6'>
            <View style={[styles.circle, {backgroundColor: "#EDFEDC"}]} className='mr-3'>
              <Ionicons name="checkmark-done-circle-outline" size={24} color="#2F5B03" />
            </View>
            <View className='flex flex-row items-center'>
              <Text className='text-lg font-medium'>Availability: </Text>
              <Text style={styles.color} className='font-bold capitalize mt-1'>{product?.inventory?.available >= 1 ? "Instore" : "Out of stock" }</Text>
            </View>
          </View>

          <View className='mb-6'>
            <View className='flex flex-row items-center gap-3'>
              <View style={[styles.circle, {backgroundColor: "#FFEFDD"}]}>
                <Fontisto name="flash" size={24} color="#FA8707" />
              </View>

              <Text className='text-lg font-medium'>Delivery Time Frame</Text>
            </View>
            <Text className='ms-12 font-bold text-base' style={commonStyles.color}>{product?.deliveryTimeFrame.minDays} - {product?.deliveryTimeFrame.maxDays} working days</Text>
          </View>

          <View className='flex flex-row items-center gap-3 mb-6'>
            <View style={[styles.circle, {backgroundColor: "#FFEDEF"}]}>
              <EvilIcons name="location" size={24} color="#EE3248" />
            </View>
            <Text className='text-lg font-medium'>Deliver to 5 Provinces</Text>
          </View>

          <View className='flex flex-row justify-between items-center py-6 px-6 mb-4 w-full' style={{backgroundColor: COLORS.light.primarytrans2}}>
            <View className='bg-white p-3'>
              <Setting color={COLORS.light.primary} />
            </View>

            <View className='w-3/5'>
              <Text className='font-bold mb-1 text-lg'>Save money!</Text>
              <Text className='text-gray-600'>Top up now and enjoy the best price in the market</Text>
              <View className='flex flex-row gap-2 mt-3 items-center' >
                <Tags />
                <Text style={commonStyles.color} className='font-medium'>Compare to market price</Text>
              </View>
            </View>

            <View>
              <GreaterThan />
            </View>
          </View>

          <View className='mb-8'>
            <ProductDetailsTab
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <DisplayTabContent activeTab={activeTab} item={product} />
          </View> 

          <View className='mb-20 flex flex-row justify-between items-center'>
            <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3' style={{backgroundColor: COLORS.light.primary, width: "45%"}} onPress={addToCart}>
              <Ionicons
                name="cart-outline"
                size={24}
                color="#fff"
              />
              <Text className='text-white font-bold'>Add to cart</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3 border border-gray-500' style={{width: "45%"}}>
              <Text className='text-gray-500 font-bold'>SHARE LINK</Text>
              <Entypo name="share" size={24} color="#222222" />
            </TouchableOpacity>

          </View>
        </ScrollView>

        {isVisible && (
          <BottomSheetWrapper>
          <View>
            <Text>hello</Text>
          </View>
        </BottomSheetWrapper>
        )}
      </View>
    </ScreenWrapper>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  headerDesc: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    // position: "absolute",
    zIndex: 100,
    width: "100%",
    // top: 150,
    flex: 1,
    height: "100%",
  },
  circle:{
    width: 35,
    height: 35,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  color: {
    color: "#2F5B03"
  }
});

