import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import {
  SAFE_AREA_PADDING,
  SCREEN_HEIGHT,
  currentFormatter,
} from '@/utils/utils';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import axiosInstance from '@/api/config';
import {BOTTOM_WRAPPER_PAGES, QUERY_ENUM} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import {useQuery} from '@tanstack/react-query';
import TimeLineComp from './(components)/Timeline';
import Button from '@/components/nativewindui/Button';
import FullPageLoader from '@/components/FullPageLoader';
import BottomSheetWrapper from '@/components/BottomSheetWrapper';
import OrderItemDetails from './(components)/OrderItemDetails';
import OrderItem from './(components)/OrderItem';

export default function Details() {
  const {t} = useTranslation();
  const {id} = useLocalSearchParams();
  const [showBottomNav, setShowBottomNav] = useState({
    page: BOTTOM_WRAPPER_PAGES.CLOSE,
  });

  function handleCloseBottomNav() {
    setShowBottomNav(() => ({page: BOTTOM_WRAPPER_PAGES.CLOSE}));
  }

  function handleShowBottomNav() {
    setShowBottomNav(() => ({page: BOTTOM_WRAPPER_PAGES.OPEN}));
  }
  const {isLoading, data: data} = useQuery({
    queryKey: [QUERY_ENUM.ORDER],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.ORDER.concat(`/${id}`));
    },
  });
  const orderData = useMemo(() => data?.data?.data, [data]);

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      {isLoading ? <FullPageLoader /> : null}
      <ArchBorder>
        <MainPageHeader name={t('order.order.details.pageHeader')} />
      </ArchBorder>
      <View
        className="flex-1 bg-white "
        style={{
          paddingHorizontal: SAFE_AREA_PADDING.paddingRight + 20,
          paddingBottom: SAFE_AREA_PADDING.paddingBottom + 30,
        }}>
        <OrderItem orderData={orderData} />
        <View
          className="mt-6 py-4 gap-y-10"
          style={{height: SCREEN_HEIGHT / 2}}>
          <FlatList
            numColumns={1}
            contentContainerStyle={{rowGap: 30}}
            data={orderData?.timeline}
            renderItem={({item}) => {
              return (
                <TimeLineComp
                  key={item?._id}
                  item={item}
                  isLastItem={
                    orderData?.timeline[orderData?.timeline.length - 1]?._id ===
                    item?._id
                  }
                />
              );
            }}
          />
        </View>
        <View className="flex flex-row items-center gap-x-4 mt-auto mb-4">
          <Button
            className="w-1/2"
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}>
            <Text className="text-white">Track Order Via Map</Text>
          </Button>
          <Button
            className="w-1/2 "
            type="outline"
            onPress={handleShowBottomNav}>
            <Text
              className="text-white"
              style={{
                color: COLORS.light.primary,
              }}>
              View Order Items
            </Text>
          </Button>
        </View>
      </View>
      {showBottomNav.page !== BOTTOM_WRAPPER_PAGES.CLOSE ? (
        <BottomSheetWrapper
          activePage={showBottomNav}
          onClose={handleCloseBottomNav}>
          <OrderItemDetails orderData={orderData} />
        </BottomSheetWrapper>
      ) : (
        <></>
      )}
    </ScreenWrapper>
  );
}
