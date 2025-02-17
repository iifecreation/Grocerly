import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CheckoutDate from '../common/Calendar/CheckoutDate';
import PickUpCard from '../common/cards/PickUpCard';
import CheckoutTime from '../common/Time/CheckoutTime';
import CustomButton from '../CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';

interface PickTimeType {
    
}


const PickUp: React.FC<PickTimeType> = () => {
    const {t} = useTranslation();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');
    const [ampm, setAmpm] = useState('AM');
    const router = useRouter()
    

    const PickupOutlet = [
        {
            id: 1,
            available: t("Checkout.Pick_up.card.available"),
            stores: t("Checkout.Pick_up.card.stores"),
            address: t("Checkout.Pick_up.card.address"),
            distance: t("Checkout.Pick_up.card.distance"),
            station: t("Checkout.Pick_up.card.station"),
            itemColor: "#EE3248",
            background: "#FFF5F7",
            iconBackground: "#FFEDEF"
        },
        {
            id: 2,
            available: t("Checkout.Pick_up.card.available"),
            stores: t("Checkout.Pick_up.card.stores"),
            address: t("Checkout.Pick_up.card.address"),
            distance: t("Checkout.Pick_up.card.distance"),
            station: t("Checkout.Pick_up.card.station"),
            itemColor: "#3A7201",
            background: "#F6FFEE",
            iconBackground: "#E7FFCE"
        },
    ]

    const goToSummary = () => {
        router.push(APP_ROUTES.CHECKOUTSUMMARY)
    }

  return (
    <View>
        <Text className='text-black font-black text-base mb-1'>{t("Checkout.Pick_up.outlets")}</Text>
        <Text className='text-gray-500 font-medium text-sm'>{t("Checkout.Pick_up.Choose_outlet")}</Text>

        <View>
            {
                PickupOutlet.map((item: any) =>{
                    return (
                       <View className='mt-4'>
                         <PickUpCard key={item.id} data={item} />
                        </View>
                    )
                })
            }
        </View>

        <CheckoutDate title={t("Checkout.Pick_up.delivery_date")} desc={t("Checkout.Pick_up.delivery_date_desc")} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <CheckoutTime ampm={ampm} hour={hour} minute={minute} setAmpm={setAmpm} setHour={setHour} setMinute={setMinute}  />

        <CustomButton navigateProps={goToSummary} textProps={t("button.Payment")}>
            <MaterialIcons name="shopping-cart-checkout" size={24} color="#ffffff" />
        </CustomButton>

    </View>
  )
}

export default PickUp

const styles = StyleSheet.create({})