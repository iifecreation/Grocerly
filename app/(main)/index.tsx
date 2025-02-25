import { View, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import ArchBorder from '@/components/ArchBorder';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import Header from '@/components/home/header';
import Filter from '@/components/Filter/Filter';
import Slider from '@/components/home/Slider';
import {SAFE_AREA_PADDING} from '@/utils/utils';
import Category from '@/components/home/category';
import Product from '@/components/home/Product';
import CartToast from '@/components/common/toasts/CartToast';
import { getUserLocation } from '@/utils/location';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { useTranslation } from 'react-i18next';
import { APP_ROUTES } from '@/contants/app-routes';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/store';

const index = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<any>({});
  const [locationLoading, setLocationLoading] = useState(true);
  const {t} = useTranslation();
  const {userData} = useAuthStore();
  const router = useRouter()

  
  const fetchLocation = async () => {
    try {
      setLocationLoading(true)
      const locationData = await getUserLocation();

      if(locationData.country == "Unknown" || !locationData){
        setLocation([]);
        setLocationLoading(false)
        return
      }
      setLocation(locationData);
      setLocationLoading(false)
    } catch (error) {
      console.log(error);
      setLocation([]);
      setLocationLoading(false)
    }
  };

  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: data,
  } = useQuery({
    queryKey: [QUERY_ENUM.PRODUCT],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.FETCH_PRODUCT);
    },
  });
  
  const orderList = useMemo(() => data?.data, [data]);

  useEffect(() => {
    fetchLocation()
  }, [])

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <ArchBorder>
        <Header location={location?.state ? `${location?.state}, ${location?.country}` : "Location Unavailable"} profilePic={userData?.image?.url ? userData?.image?.url : 'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg'} setModalVisible={setModalVisible} locationLoading={locationLoading} />
      </ArchBorder>
      <View style={styles.main}>
        {/* Home Banner */}
        <Slider />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* category section slider  */}
          <View style={{marginTop: 200}}>
            <Category />
          </View>

          {/* display product section */}
          {
            isLoading || isFetching ? 
            (<ActivityIndicator size={'large'} />)
            :
            error 
            ?
            (
              <Text className='mt-5 mb-8 text-center'>{t("form.network.title")}</Text>
            )
            :
            (
              <View className='mt-5 pb-8'>
                <View className='flex-row justify-between items-center mb-3'>
                  <Text className='font-black mb-4 text-lg'>{t('product.title')}</Text>
                  <TouchableOpacity 
                    onPress={() => router.push(APP_ROUTES.ALL_PRODUCT)}
                  >
                    <Text style={{color: COLORS.light.primary, borderBottomWidth: 1, borderBottomColor: COLORS.light.primary}}>{t('product.view')}</Text>
                  </TouchableOpacity>
                </View>

                <Product orderList={orderList?.data?.data} />
              </View>
            )
          }
        </ScrollView>

      </View>

      <Filter modalVisible={modalVisible} setModalVisible={setModalVisible} country={location?.country} state={location?.state} />
      <CartToast />
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    backgroundColor: "#fff",
    flex: 1
  }
});
