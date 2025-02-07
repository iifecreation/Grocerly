import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import FullPageLoader from '../FullPageLoader';

const Product = () => {

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
    
      console.log(error, isError);

  return (
    <View>
      {isLoading || isFetching ? <FullPageLoader /> : null}

      {orderList?.data?.length < 1 ? (
            <Text>error</Text>
          ) : (
          <Text>hello </Text>)
}

    </View>
  )
}

export default Product

const styles = StyleSheet.create({})