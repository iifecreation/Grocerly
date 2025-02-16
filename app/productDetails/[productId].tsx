import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
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
import BottomSheetWrapper from '@/components/common/BottomSheet/BottomSheetWrapper';
import AddtoCart from '@/components/product-details/AddtoCart';
import CartPopup from '@/components/product-details/CartPopup';
import { getCart, saveCart } from '@/lib/cart';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
  const {t} = useTranslation();
  const params = useLocalSearchParams();
  const tabs = [t('product.product-details.tag-Description'), t('product.product-details.tag-Nutritional'), t('product.product-details.tag-Reviews')];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

  const addToCart = async () => {
    const cart = await getCart();

    // Check if the product is already in the cart
    const isProductInCart = cart.some((item: any) => item.id === product?.id);

    if (isProductInCart) {
        // If the product is already in cart
    } else {
      // If not in cart, add it
      const updatedCart = [...cart, { ...product, count: 1, totalPrice: product.price }];

      // Save the updated cart to AsyncStorage
      await saveCart(updatedCart);  
    }
    showBottomSheet()
    bottomSheetRef.current?.expand();  
  }

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      {isLoading || isFetching ? <FullPageLoader /> : null}

      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t('product.product-details.title')} />
        </ArchBorder>

        <ScrollView style={styles.headerDesc} className='pb-8'>
          <View className='mb-10'>
            <Image source={{uri: product?.image?.url}} className='w-full h-[200] rounded-lg object-cover' /> 
          </View>

          <View className='flex flex-row items-center mb-2'>
            <Text className='font-bold text-base'>{t('product.product-details.category')}: </Text>
            <Text className='capitalize text-base'>{product?.productLabel}</Text>
          </View>

          <Text className='font-bold text-3xl capitalize mb-3'>{product?.name}</Text>
          <Text style={commonStyles.color} className='font-bold text-2xl uppercase mb-4'>MYR {product?.price}</Text>
          
          <View className='flex flex-row items-center mb-6'>
            <View style={[styles.circle, {backgroundColor: "#EDFEDC"}]} className='mr-3'>
              <Ionicons name="checkmark-done-circle-outline" size={24} color="#2F5B03" />
            </View>
            <View className='flex flex-row items-center'>
              <Text className='text-lg font-medium'>{t('product.product-details.Availability')}: </Text>
              <Text style={styles.color} className='font-bold capitalize mt-1'>{product?.inventory?.available >= 1 ? "Instore" : "Out of stock" }</Text>
            </View>
          </View>

          <View className='mb-6'>
            <View className='flex flex-row items-center gap-3'>
              <View style={[styles.circle, {backgroundColor: "#FFEFDD"}]}>
                <Fontisto name="flash" size={24} color="#FA8707" />
              </View>

              <Text className='text-lg font-medium'>{t('product.product-details.Delivery')}</Text>
            </View>
            <Text className='ms-12 font-bold text-base' style={commonStyles.color}>{product?.deliveryTimeFrame.minDays} - {product?.deliveryTimeFrame.maxDays} {t('product.product-details.time')}</Text>
          </View>

          <View className='flex flex-row items-center gap-3 mb-6'>
            <View style={[styles.circle, {backgroundColor: "#FFEDEF"}]}>
              <EvilIcons name="location" size={24} color="#EE3248" />
            </View>
            <Text className='text-lg font-medium'>{t('product.product-details.Provinces')}</Text>
          </View>

          <View className='flex flex-row justify-between items-center py-6 px-6 mb-4 w-full' style={{backgroundColor: "#F15A2233"}}>
            <View className='bg-white p-3'>
              <Setting color={COLORS.light.primary} />
            </View>

            <View className='w-3/5'>
              <Text className='font-bold mb-1 text-lg'>{t('product.product-details.Save')}</Text>
              <Text className='text-gray-600'>{t('product.product-details.save-desc')}</Text>
              <View className='flex flex-row gap-2 mt-3 items-center' >
                <Tags />
                <Text style={commonStyles.color} className='font-medium'>{t('product.product-details.save-title-desc')}</Text>
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
              <Text className='text-white font-bold'>{t('button.cart')}</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3 border border-gray-500' style={{width: "45%"}}>
              <Text className='text-gray-500 font-bold'>{t('button.share')}</Text>
              <Entypo name="share" size={24} color="#222222" />
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>

      {isVisible &&
        (
          <BottomSheetWrapper bottomSheetRef={bottomSheetRef}>
            <View className='bg-white' style={{backgroundColor: "#fff"}}>
              <AddtoCart setModalVisible={setModalVisible} item={product} bottomSheetRef={bottomSheetRef}/>
            </View>
          </BottomSheetWrapper>
        )
      }
      <View>
        <CartPopup modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </ScreenWrapper>
  )
}


export default ProductDetail

const styles = StyleSheet.create({
  headerDesc: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    // position: "absolute",
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

