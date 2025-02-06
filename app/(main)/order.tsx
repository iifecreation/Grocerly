import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useMemo, useRef} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT} from '@/utils/utils';
import {Link, router} from 'expo-router';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '@/api/config';
import {API_ROUTES} from '@/contants/api-routes';
import {QUERY_ENUM} from '@/contants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {useTranslation} from 'react-i18next';
import ListEmptyContainer from '@/components/ListEmptyContainer';
import MainPageHeader from '@/components/MainPageHeader';
import {APP_ROUTES} from '@/contants/app-routes';
import FullPageLoader from '@/components/FullPageLoader';

const Order = () => {
  const listRef = useRef(null);
  const {t} = useTranslation();
  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: data,
  } = useQuery({
    queryKey: [QUERY_ENUM.ORDER],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.FETCH_ORDER);
    },
  });
  const orderList = useMemo(() => data?.data, [data]);

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      {isLoading || isFetching ? (
        <FullPageLoader />
      ) : (
        // <></>
        <View className="flex-1 bg-white">
          <ArchBorder>
            <MainPageHeader name={t('order.header')} />
          </ArchBorder>
          {orderList?.data?.length < 1 ? (
            <ListEmptyContainer />
          ) : (
            <View style={{paddingHorizontal: SAFE_AREA_PADDING.paddingLeft}}>
              <View className="mb-4">
                <Text className="font-bold text-base leading-[25px]">
                  {t('order.pageHeader')}
                </Text>
              </View>
              <View style={styles.flatlistContainer}>
                <FlatList
                  ref={listRef}
                  numColumns={1}
                  data={orderList?.data}
                  keyExtractor={(_, id) => id.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{rowGap: 10}}
                  renderItem={({item, index}: any) => {
                    return (
                      <View
                        key={item?.id}
                        className="flex flex-row items-center h-[129px] gap-x-3 py-4 border-b border-gray-300"
                        style={styles.shadow}>
                        <Image
                          style={{
                            width: 79,
                            height: 79,
                          }}
                          source={{
                            uri: item?.items[0]?.product?.image?.url,
                          }}
                        />
                        <View className="gap-y-2 ">
                          <View className="flex flex-row jitems-center gap-x-2">
                            <Ionicons
                              name="location-outline"
                              size={12}
                              color={COLORS.white}
                              className="w-6 py-1.5 flex text-center content-center rounded-full bg-red-200"
                            />
                            <Text
                              className="font-bold text-sm leading-[25px] "
                              lineBreakMode="tail"
                              ellipsizeMode="tail">
                              {item?.items[0]?.product?.name}
                            </Text>
                          </View>
                          <View className="gap-y-1">
                            <Text className="font-semibold text-xs leading-[18px]">
                              {t('order.orderID')}: {item?.orderId}
                            </Text>
                            <Text className=" text-xs leading-[18px]">
                              {t('order.date')}:{' '}
                              {format(
                                new Date(item?.timeline[0]?.createdAt),
                                'yyyy/MM/dd',
                              )}
                            </Text>
                            <Text className=" text-xs text-gray-950 leading-[18px]">
                              {t('order.item')}: {item?.items?.length}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <View className="flex justify-between  h-full">
                            {/* //truck-fast-outline */}
                            <View className="flex flex-row items-center gap-x-2">
                              <MaterialCommunityIcons
                                name="truck-fast-outline"
                                size={24}
                                color={COLORS.light.grey3}
                              />
                              <Text className="font-medium text-[10px] leading-[18px] text-gray-900 capitalize  ">
                                {item?.status}
                              </Text>
                            </View>

                            <Text
                              onPress={() =>
                                router.push({
                                  pathname: APP_ROUTES.ORDER_DETAILS,
                                  params: {id: item?.id},
                                })
                              }
                              style={{color: COLORS.light.primary}}
                              className="font-medium text-xs leading-[18px] underline ">
                              {t('order.details')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScreenWrapper>
  );
};

export default Order;

const styles = StyleSheet.create({
  flatlistContainer: {
    height: SCREEN_HEIGHT / 1.5,
    width: '100%',
    paddingBottom: SAFE_AREA_PADDING.paddingBottom * 4,
  },
  shadow: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    padding: 10,
  },
});
