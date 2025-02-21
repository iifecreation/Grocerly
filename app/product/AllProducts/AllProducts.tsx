import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import ArchBorder from '@/components/ArchBorder';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import Filter from '@/components/Filter/Filter';
import {SAFE_AREA_PADDING} from '@/utils/utils';
import Category from '@/components/home/category';
import Product from '@/components/home/Product';
import CartToast from '@/components/common/toasts/CartToast';
import { getUserLocation } from '@/utils/location';
import { keepPreviousData, useInfiniteQuery, useQuery,  } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { useTranslation } from 'react-i18next';
import { APP_ROUTES } from '@/contants/app-routes';
import Ionicons from '@expo/vector-icons/Ionicons';
import FilterIcon from "@/components/icons/filter"
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type Props = {
    limit: number;
    page: number;
};

const AllProducts = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [location, setLocation] = useState<any>({});
    const [page, setPage] = useState<number>(1);
    const {t} = useTranslation();
    const router = useRouter()

    const fetchLocation = async () => {
        try {
        const locationData = await getUserLocation();
        setLocation(locationData);
        
        } catch (error) {
        console.log(error);
        }
    };

    const fetchProduct = async ({ limit, page }: Props) => {
        return await axiosInstance.get(`${API_ROUTES.FETCH_PRODUCT}?page=${page}`);
    }

    const {
        data,
        error,
        isFetching,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        isPending,
      } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: ({ pageParam }) => fetchProduct({limit: 10, page: pageParam}),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            
            if (lastPage?.data?.data?.data.length === 0) {
              return undefined
            }
            return lastPageParam + 1
          },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {

            if (firstPageParam <= 1) {
                return undefined
            }
            return firstPageParam - 1
        },
      })
  
    const allData = data?.pages.flatMap((page) => page) || [];
    const orderList = useMemo(() => allData, [data]);
    let fetchData = JSON.parse(orderList[0]?.request?._response)?.data?.data
    // const allData = fetchData
    console.log(fetchData)
    
    
    useEffect(() => {
        fetchLocation()
    }, [])

    const loadMoreData = () => hasNextPage && fetchNextPage()

    return (
        <ScreenWrapper background={COLORS.light.primary}>
            <ArchBorder>
                <View className='justify-between items-center w-full flex-row' style={{marginTop: -25, paddingHorizontal: SAFE_AREA_PADDING.paddingRight}}>
                    <View className="flex justify-center items-center">
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={COLORS.white}
                            style={{position: 'absolute', left: 10}}
                            onPress={() => router.back()}
                        />
                        <Text style={styles.name}>{t("product.title")}</Text>
                    </View>
                    <View className='flex flex-row gap-2 items-center'>
                        <Link href={APP_ROUTES.SEARCH}>
                            <Ionicons name="search" size={24} color={COLORS.white} />
                        </Link>
                        <Link href={APP_ROUTES.NOTIFICATION}>
                            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
                        </Link>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <FilterIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </ArchBorder>

            <View style={styles.main} >
                {/* category section slider  */}
                <View style={styles.position}>
                    <Category />
                </View>

                <View style={{marginTop: 85, width: "100%", flex: 1}}>
            
                    {isPending || isFetching ? (
                        <ActivityIndicator size={'large'}  />
                        ) : isError || fetchData?.length == 0 ? (
                            <Text className='text-center font-bold text-lg'>{t("product.Categories.notAvailable")}</Text>
                        ) : (
                            <View className='mt-5 pb-8 flex-1'>
                                <Product orderList={allData} isFetchingNextPage={isFetchingNextPage} onEndReachedFunc={loadMoreData}/>
                            </View>
                        )
                    }
                </View>
            </View>
            <Filter modalVisible={modalVisible} setModalVisible={setModalVisible} country={location?.country} state={location?.state} />
            <CartToast />
        </ScreenWrapper>
    );
};

export default AllProducts;

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
        backgroundColor: "#fff",
        flex: 1
    },
    name: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 40,
        textAlign: 'center',
        color: COLORS.white,
        marginLeft: 60
    },
    position:{
        position: "absolute",
        zIndex: 4,
        left: 0,
        top: -50,
        width: width,
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
        backgroundColor: "#fff",
        paddingBottom: 10
    },
});
