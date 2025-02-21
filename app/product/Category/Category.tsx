import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { getUserLocation } from '@/utils/location';
import { COLORS } from '@/theme/colors';
import CartToast from '@/components/common/toasts/CartToast';
import ScreenWrapper from '@/components/ScreenWrapper';
import ArchBorder from '@/components/ArchBorder';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import FullPageLoader from '@/components/FullPageLoader';
import MainPageHeader from '@/components/MainPageHeader';
import Category from '@/components/home/category';
import Product from '@/components/home/Product';
import { useTranslation } from 'react-i18next';

const CategoryScreen = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const {t} = useTranslation();
    const params = useLocalSearchParams();

    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: response,
    } = useQuery({
        queryKey: [QUERY_ENUM.CATEGORY_PRODUCT],
        queryFn: async () => {
          return await axiosInstance.get(`${API_ROUTES.FETCH_PRODUCT_BY_CATEGORY}/${params.id}`);
        },
    });

    const categoryData = useMemo(() => response?.data, [response]);
    
    return (
    <ScreenWrapper background={COLORS.light.primary}>
        <ArchBorder>
            <MainPageHeader name={t("product.Categories.title")} />
        </ArchBorder>

        <View style={styles.main}>
            {/* category section slider  */}
            <View className='mb-5'>
                <Category />
            </View>
  
            {/* display product section */}
            {isLoading || isFetching ? (
                    <ActivityIndicator size={'large'}  />
            ) : isError || categoryData?.data?.data?.length == 0 ? (
                <Text className='text-center font-bold text-lg'>{t("product.no_product")}</Text>
            ) : (
                <Product orderList={categoryData?.data?.data} />
            )}
        </View>

        <CartToast />
      </ScreenWrapper>
    );
  };
  
  export default CategoryScreen;
  
  const styles = StyleSheet.create({
    main: {
      paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
      backgroundColor: "#fff",
      flex: 1,
      width: "100%",
    }
  });