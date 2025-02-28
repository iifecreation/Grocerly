import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import DeliveryCard from '../common/cards/DeliveryCard';
import CheckoutDate from '../common/Calendar/CheckoutDate';
import CheckoutTime from '../common/Time/CheckoutTime';
import CustomButton from '../CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';
import NoAddressIcon from "@/components/icons/no_address";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { FlatList } from 'react-native';


interface DeliveryPropsType {
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


const Delivery: React.FC<DeliveryPropsType> = ({ampm, hour, minute, setHour, setMinute, setSelectedDate, selectedDate, setAmpm, SetSelectedOrderAddress, selectedOrderAddress, handleCheckout}) => {
    const {t} = useTranslation();
    const router = useRouter()
    const listRef = useRef(null);
    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: address,
    } = useQuery({
        queryKey: [QUERY_ENUM.FETCH_ADDRESS],
        queryFn: async () => {
          return await axiosInstance.get(API_ROUTES.FETCH_ADDRESS);
        },
        refetchOnMount: true
    });

    const addressList = useMemo(() => address?.data, [address]);

    const setUpAddress = () => {
        router.push(APP_ROUTES.ADDRESS)
    }

  return (
    <View>
        { isLoading || isFetching ?
            (
                <ActivityIndicator size="large" />
            )
        :
        error || isError ?
        (
            <Text className="text-center font-bold text-lg">{t("account.Address.error")}</Text>
        )
        :
        addressList?.addresses?.length == 0 ? (
        <View className='flex-1 items-center justify-center mt-7'>
            <NoAddressIcon />
            <Text className='text-base text-center font-bold mt-5'>{t("Checkout.Delivery.Setup_Delivery.title")}</Text>
            <Text className='text-base text-center font-normal mt-2'>{t("Checkout.Delivery.Setup_Delivery.desc")}</Text>

            <CustomButton navigateProps={setUpAddress} textProps={t("button.Setup_Address")}>
                <Ionicons name="location-outline" size={24} color="#ffffff" />
            </CustomButton>
        </View>
        )
        : 
        (
            <View>
                <View className='flex-row justify-between items-center'>
                    <View>
                        <Text className='text-black font-black text-base mb-1'>{t("Checkout.Delivery.address")}</Text>
                        <Text className='text-gray-500 font-medium text-sm'>{t("Checkout.Delivery.choose_address")}</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push(APP_ROUTES.ADD_ADDRESS)}>
                        <EvilIcons name="plus" size={24} color="red" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    ref={listRef}
                    data={addressList?.addresses}
                    numColumns={1}
                    keyExtractor={(_, id) => id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{columnGap: 10, rowGap: 15, width: "100%", flex: 1, marginTop: 5 }}
                    renderItem={({item}) =>  (
                        <TouchableOpacity className='mt-4' onPress={() => {
                            SetSelectedOrderAddress((prev) => ({
                                id: item.id,
                                data: item
                            }))
                        }}>
                            <DeliveryCard key={item.id} data={item} selectedOrderAddress={selectedOrderAddress} />
                        </TouchableOpacity>
                        )
                    }
                />

                <CheckoutDate title={t("Checkout.Delivery.delivery_date")} desc={t("Checkout.Delivery.Delivery_Time_desc")} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                <CheckoutTime ampm={ampm} hour={hour} minute={minute} setAmpm={setAmpm} setHour={setHour} setMinute={setMinute}  />

                <CustomButton navigateProps={() => handleCheckout("Delivery Address")} textProps={t("button.Payment")}>
                    <MaterialIcons name="shopping-cart-checkout" size={24} color="#ffffff" />
                </CustomButton>

            </View>
        )
        }
    </View>
    
  )
}

export default Delivery

const styles = StyleSheet.create({})