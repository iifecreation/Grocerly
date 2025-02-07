import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {COLORS} from '@/theme/colors';
import {format} from 'date-fns';
import {currentFormatter} from '@/utils/utils';

const OrderItem = ({orderData}: any) => {
  const {t} = useTranslation();
  return (
    <View className="gap-y-2 flex flex-row items-start gap-x-6 ">
      <View className="w-[66px] h-[66px] bg-orange-100 flex flex-row items-center justify-center rounded-full">
        <Feather name="package" size={29} color={COLORS.light.primary} />
      </View>
      <View className="gap-y-1">
        <Text className="font-semibold text-[15px] leading-[18px]">
          {t('order.order.details.order')}: {orderData?.orderId}
        </Text>
        <Text className=" text-xs text-gray-500 leading-[18px]">
          {t('order.order.details.date')}:{' '}
          {format(
            new Date(orderData?.timeline?.[0]?.createdAt ?? new Date()),
            'MMMM d yyyy',
          )}
        </Text>
        <View className="flex flex-row items-center gap-x-4">
          <Text className=" text-xs text-gray-950 leading-[18px]">
            {t('order.order.details.items')}:{' '}
            <Text className="font-bold">{orderData?.items?.length}</Text>
          </Text>
          <Text className=" text-xs text-gray-950 leading-[18px]">
            {t('order.order.details.amount')}:{' '}
            <Text className="font-bold">
              {currentFormatter(orderData?.totalAmount)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({});
