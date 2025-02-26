import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {SAFE_AREA_PADDING} from '@/utils/utils';
import React, { useMemo, useState } from 'react';
import ArchBorder from '@/components/ArchBorder';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import EmptyNotificationIcon from '@/components/icons/Notification'
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { useAuthStore } from '@/store/store';

const height = Dimensions.get('window').height

const notification = () => {
  const {t} = useTranslation();
  const [notified, setNotified] = useState([])
  const {token} = useAuthStore();
  console.log(token);
  

  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: data,
  } = useQuery({
    queryKey: [QUERY_ENUM.FETCHNOTIFICATION],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.FETCHNOTIFICATION);
    },
  });

  const notifiedList = useMemo(() => data?.data, [data]);

  console.log(notifiedList);
  
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t('notification.header')} />
        </ArchBorder>

        <View style={styles.headerDesc}>
          {
            isLoading || isFetching ?
            (
              <ActivityIndicator size="large" />
            )
            :
            error || isError
            ? 
            (
              <View>
                <Text className='text-center font-bold text-base text-black'>{t('form.network.title')}</Text>
                <Text className='text-center font-medium text-base text-gray-400'>{t('form.network.desc')}</Text>
              </View>
            )
            :
            notifiedList?.data?.length == 0 ? (
              <View className='flex-1 w-full flex-col items-center justify-center bg-white' style={{height: height}} >
                <EmptyNotificationIcon />
                <Text className='mt-5 font-bold text-base'>{t('notification.No_Notifications')}</Text>
              </View>
            ) 
            :
            (
              <View className='flex-1'>
                <Text className='text-center'>{t('notification.headerTitle')}</Text>
              </View>
            )
          }
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default notification;

const styles = StyleSheet.create({
  headerDesc: {
    width: "100%",
    flex: 1,
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
});