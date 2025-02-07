import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import FullPageLoader from '../FullPageLoader';
import { useTranslation } from 'react-i18next';
import ProductCard from '../common/cards/ProductCard';

const Product = () => {
    const listRef = useRef(null);
    const {t} = useTranslation();
    
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


      const showProduct = ({ item }: { item: any }) => {  
        return (
            <ProductCard item={item} />
        )
      }

  return (
    <View style={{flex: 1, height: "100%"}} className='mt-9 pb-8'>
      {isLoading || isFetching ? <FullPageLoader /> : null}

      {orderList?.data?.length < 1 ? (
            <Text>error</Text>
        ) : (
            <View style={{flex: 1}}>
                <FlatList 
                    ref={listRef}
                    numColumns={2}
                    data={orderList?.data?.data}
                    keyExtractor={(_, id) => id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 10}}
                    renderItem={showProduct}
                />
            </View>
        )
    }

    </View>
  )
}

export default Product

