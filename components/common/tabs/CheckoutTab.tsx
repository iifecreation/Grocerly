import { StyleSheet, Text, View, TouchableOpacity, Animated, LayoutChangeEvent } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import DeliveryIcon from "@/components/icons/Delivery"
import PickUpIcon from "@/components/icons/pickUp"
import { COLORS } from '@/theme/colors'
import { useTranslation } from 'react-i18next'

interface TakeOrder {
    handleLayout: (event: LayoutChangeEvent, tab: number) => void
    setActive: Dispatch<SetStateAction<number>>
    active: number
    handleSlide: (type: number) => void
    xTabOne: number
    xTabTwo: number
    translateX: Animated.Value
};

const CheckoutTab: React.FC<TakeOrder> = ({handleLayout, setActive, active, handleSlide, xTabOne, xTabTwo, translateX}) => {

    const {t} = useTranslation();

  return (
    <View
        style={{
        flexDirection: "row",
        marginTop: 40,
        marginBottom: 20,
        height: 50,
        position: "relative",
        backgroundColor: "#EBFED9",
        borderRadius: 100
        }}
    >
        <Animated.View
        style={{
            position: "absolute",
            width: "44%",
            height: "80%",
            top: "10%",
            left: "3%",
            backgroundColor: "#ffffff",
            borderRadius: 100,
            zIndex: 2,
            transform: [{ translateX }],
            alignItems: "center",
            justifyContent: "center"
        }}
        />
        <TouchableOpacity
        style={{
            flex: 1,
            
        }}
        onLayout={(event) => handleLayout(event, 1)}
        onPress={() => {
            setActive(0);
            handleSlide(xTabOne);
        }}
        className='justify-center items-center flex-row gap-2 relative z-20'
        >
        <View className='flex flex-row justify-center items-center w-[30] h-[30] rounded-full' style={{backgroundColor: "#FA8707"}}>
            <DeliveryIcon />
        </View>
        <Text style={{ color: active === 0 ? COLORS.light.primary : "#000000" }} className='font-black'>
            {t("Checkout.tab_Delivery")}
        </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        onLayout={(event) => handleLayout(event, 2)}
        onPress={() => {
            setActive(1);
            handleSlide(xTabTwo);
        }}
        className='justify-center items-center flex-row gap-2 relative z-20'
        >
        <View className='flex flex-row justify-center items-center w-[30] h-[30] rounded-full' style={{backgroundColor: "#FFEDEF"}}>
            <PickUpIcon />
        </View>
        <Text style={{ color: active === 1 ? COLORS.light.primary : "#000000" }} className='font-black'>
            {t("Checkout.tab_Pick_up")}
        </Text>
        </TouchableOpacity>
    </View>
  )
}

export default CheckoutTab

const styles = StyleSheet.create({})