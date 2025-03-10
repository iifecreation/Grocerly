import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CheckoutDate from '../common/Calendar/CheckoutDate';
import PickUpCard from '../common/cards/PickUpCard';
import CheckoutTime from '../common/Time/CheckoutTime';
import CustomButton from '../CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';
import { interpolate } from 'react-native-reanimated';
import { saveOrderDetails } from '@/lib/orderDetails';
import Toast from 'react-native-toast-message';

interface PickTimeType {
    ampm: string
    hour: string
    minute: string
    setAmpm: Dispatch<SetStateAction<string>>
    setHour: Dispatch<SetStateAction<string>>
    setMinute: Dispatch<SetStateAction<string>>
    setSelectedDate: Dispatch<SetStateAction<string>>
    selectedDate: string
    SetSelectedOrderAddress: Dispatch<React.SetStateAction<{
        id: string;
        data: never[];
    }>>,
    selectedOrderAddress: {
        id: string;
        data: never[];
    },
    handleCheckout: (type: string) => void
}


const PickUp: React.FC<PickTimeType> = ({ampm, hour, minute, setHour, setMinute, setSelectedDate, selectedDate, setAmpm, SetSelectedOrderAddress, selectedOrderAddress, handleCheckout}) => {
    const {t} = useTranslation();
    const router = useRouter()

    const PickupOutlet = [
        {
            id: 8978477363,
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
            id: 283763627,
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

  return (
    <View>
        <Text className='text-black font-black text-base mb-1'>{t("Checkout.Pick_up.outlets")}</Text>
        <Text className='text-gray-500 font-medium text-sm'>{t("Checkout.Pick_up.Choose_outlet")}</Text>

        <View>
            {
                PickupOutlet.map((item: any) =>{
                    return (
                       <TouchableOpacity className='mt-4' onPress={() => {
                            SetSelectedOrderAddress((prev) => ({
                                id: item.id,
                                data: item
                            }))
                       }}>
                         <PickUpCard key={item.id} data={item} selectedOrderAddress={selectedOrderAddress} />
                        </TouchableOpacity>
                    )
                })
            }
        </View>

        <CheckoutDate title={t("Checkout.Pick_up.delivery_date")} desc={t("Checkout.Pick_up.delivery_date_desc")} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <CheckoutTime ampm={ampm} hour={hour} minute={minute} setAmpm={setAmpm} setHour={setHour} setMinute={setMinute}  />

        <CustomButton navigateProps={() => handleCheckout("Pickup Address")} textProps={t("button.Payment")}>
            <MaterialIcons name="shopping-cart-checkout" size={24} color="#ffffff" />
        </CustomButton>

    </View>
  )
}

export default PickUp

const styles = StyleSheet.create({})