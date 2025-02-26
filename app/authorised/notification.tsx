import {View, Text, StyleSheet, Dimensions, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {SAFE_AREA_PADDING} from '@/utils/utils';
import React, { useMemo, useRef, useState } from 'react';
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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Delete from '@/components/icons/delete';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import CartToast from '@/components/common/toasts/CartToast';

const height = Dimensions.get('window').height

const notification = () => {
  const {t} = useTranslation();
  const [notified, setNotified] = useState([])
  const listRef = useRef(null);

  const {
    isLoading,
    isFetching,
    error,
    isError,
    data: data,
    refetch,
  } = useQuery({
    queryKey: [QUERY_ENUM.FETCHNOTIFICATION],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.FETCHNOTIFICATION);
    },
  });

  const notifiedList = useMemo(() => data?.data, [data]);

  console.log(notifiedList);

  const handleApiRequest = async (method: 'put' | 'delete', id: string) => {
    try {
      let response;
  
      // Perform the API request based on method
      if (method === 'put') {
        response = await axiosInstance.put(`${API_ROUTES.FETCHNOTIFICATION}/${id}/read`);
      } else if (method === 'delete') {
        response = await axiosInstance.delete(`${API_ROUTES.FETCHNOTIFICATION}/${id}`);
      }
  
      console.log(response?.data);
  
      // Show appropriate toast based on the response
      if (response?.data?.status === true) {
        Toast.show({
          type: 'success',
          text1: response?.data?.message
        });
      } else {
        Toast.show({
          type: 'info',
          text1: t("form.server_error.title"),
          text2: t("form.server_error.desc"),
        });
      }

      refetch(); // This will trigger a re-fetch of the data from the server
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: t("form.network.title"),
        text2: t("form.network.desc"),
      });
    }
  };
  
  const handleUpdate = async (id: string) => {
    await handleApiRequest( 'put', id);
  }

  const handleDelete = async (id: string, ) => {
    await handleApiRequest( 'delete', id);
  }

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, id: string) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 100 }],
      };
    });
  
    return (
      <Reanimated.View style={styleAnimation}>
        <TouchableOpacity style={styles.rightAction} onPress={() => handleDelete(id)}>
        <Delete color="#ffffff" fillOpacity={1}/>
        </TouchableOpacity>
      </Reanimated.View>
    );
  }
  
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
              <View className='flex-1 mb-5'>
                <Text className='text-center mb-3'>{t('notification.headerTitle')}</Text>

                <FlatList
                  ref={listRef}
                  data={notifiedList?.data}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{rowGap: 20}}
                  style={{marginBottom: 20}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item})=> (
                    <ReanimatedSwipeable
                      containerStyle={styles.swipeable}
                      friction={2}
                      enableTrackpadTwoFingerGesture
                      rightThreshold={40}
                      renderRightActions={(prog,drag) => RightAction(prog, drag, item?._id)}>
                      <View className='flex-row justify-between w-full border-b-2 py-3 px-2 gap-4 border-b-gray-300' 
                      style={{backgroundColor: item?.isRead ? "#ffffff" : "#D9D9D933"}}
                      >
                        <TouchableOpacity onPress={() => handleUpdate(item?._id)} >
                          <MaterialCommunityIcons name="bell-ring-outline" size={24} color={item?.isRead ? "#000000" : COLORS.light.primary} />
                        </TouchableOpacity>

                        <View className='flex-1'>
                          <Text className='font-bold mb-1 text-sm'>{item?.title}</Text>
                          <Text className='font-light mb-3 text-sm'>{item?.message}</Text>
                          <Text className='text-gray-500 text-right font-bold'>
                            {new Date(item?.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true, 
                            })}
                          </Text>
                        </View>
                      </View>
                    </ReanimatedSwipeable>
                  )}
                />
              </View>
            )
          }
        </View>
        <CartToast />
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
  rightAction: { 
    width: 100, 
    height: "100%", 
    backgroundColor: COLORS.light.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    alignItems: 'center',
  },
});