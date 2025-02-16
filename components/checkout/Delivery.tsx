import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import DeliveryCard from '../common/cards/DeliveryCard';
import CheckoutDate from '../common/Calendar/CheckoutDate';
import CheckoutTime from '../common/Time/CheckoutTime';

interface PickTimeType {
    hour: string
    minute: string
    ampm: string
    setAmpm: Dispatch<SetStateAction<string>>
    setHour: Dispatch<SetStateAction<string>>
    setMinute: Dispatch<SetStateAction<string>>
}

const Delivery: React.FC<PickTimeType> = ({hour, minute, ampm, setAmpm, setHour, setMinute}) => {
    const {t} = useTranslation();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const deliveryAddress = [
        {
            id: 1,
            available: t("Checkout.Delivery.card.available"),
            stores: t("Checkout.Delivery.card.stores"),
            address: t("Checkout.Delivery.card.address"),
        }
    ]

  return (
    <View>
      <View className='flex-row justify-between items-center'>
        <View>
            <Text className='text-black font-black text-base mb-1'>{t("Checkout.Delivery.address")}</Text>
            <Text className='text-gray-500 font-medium text-sm'>{t("Checkout.Delivery.choose_address")}</Text>
        </View>
        <EvilIcons name="plus" size={24} color="red" />
      </View>

      <View className='mt-3 w-full'>
            {
                deliveryAddress.map((item: any) =>{
                    return (
                       <View className='mt-4'>
                         <DeliveryCard key={item.id} data={item} />
                        </View>
                    )
                })
            }
        </View>

        <CheckoutDate title={t("Checkout.Delivery.delivery_date")} desc={t("Checkout.Delivery.Delivery_Time_desc")} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <CheckoutTime ampm={ampm} hour={hour} minute={minute} setAmpm={setAmpm} setHour={setHour} setMinute={setMinute}  />

    </View>
  )
}

export default Delivery

const styles = StyleSheet.create({})