import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import DeliveryCard from '../common/cards/DeliveryCard';
import CheckoutDate from '../common/Calendar/CheckoutDate';
import CheckoutTime from '../common/Time/CheckoutTime';
import CustomButton from '../CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';


interface PickTimeType {
    
}

const Delivery: React.FC<PickTimeType> = () => {
    const {t} = useTranslation();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');
    const [ampm, setAmpm] = useState('AM');
    const router = useRouter()

    const deliveryAddress = [
        {
            id: 1,
            available: t("Checkout.Delivery.card.available"),
            stores: t("Checkout.Delivery.card.stores"),
            address: t("Checkout.Delivery.card.address"),
        }
    ]

    const goToSummary = () => {
        router.push(APP_ROUTES.CHECKOUTSUMMARY)
    }

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

        <CustomButton navigateProps={goToSummary} textProps={t("button.Payment")}>
            <MaterialIcons name="shopping-cart-checkout" size={24} color="#ffffff" />
        </CustomButton>

    </View>
  )
}

export default Delivery

const styles = StyleSheet.create({})