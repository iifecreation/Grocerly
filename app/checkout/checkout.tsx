import { Animated, Dimensions, LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/theme/colors';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import CheckoutTab from '@/components/common/tabs/CheckoutTab';
import PickUp from '@/components/checkout/PickUp';
import Delivery from '@/components/checkout/Delivery';
import CartToast from '@/components/common/toasts/CartToast';
import Toast from 'react-native-toast-message';
import { saveOrderDetails } from '@/lib/orderDetails';
import { APP_ROUTES } from '@/contants/app-routes';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

const { width } = Dimensions.get("window");

const CheckOut = () => {
  const {t} = useTranslation();
  const [active, setActive] = useState(0);
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [selectedOrderAddress, SetSelectedOrderAddress] = useState({
    id: "",
    data: []
  });
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');

  // Animated values using useRef to persist values across renders
  const translateX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const translateXTabOne = useRef<Animated.Value>(new Animated.Value(width)).current;
  const translateXTabTwo = useRef<Animated.Value>(new Animated.Value(0)).current;

  // Slide animation handler
  const handleSlide = (type: number) => {
      Animated.spring(translateX, {
        toValue: type,
        useNativeDriver: true,
      }).start();

      if (active === 0) {
        Animated.parallel([
          Animated.spring(translateXTabOne, {
              toValue: 0,
              useNativeDriver: true,
          }).start(),
          Animated.spring(translateXTabTwo, {
              toValue: width,
              useNativeDriver: true,
          }).start()
        ]);
      } else {
          Animated.parallel([
              Animated.spring(translateXTabOne, {
                  toValue: -width,
                  useNativeDriver: true,
              }).start(),
              Animated.spring(translateXTabTwo, {
                  toValue: 0,
                  useNativeDriver: true,
              }).start()
          ]);
      }
  };

  // Layout change handler for tabs
  const handleLayout = (event: LayoutChangeEvent, tab: number) => {
    const { x } = event.nativeEvent.layout;
    if (tab === 1) {
        setXTabOne(x);
    } else {
        setXTabTwo(x);
    }
  };

  const goToSummary = (type: string) => {
    
    const CheckOutDetails = {
      type: type,
      time: {
        hour,
        minute,
        ampm
      },
      date: selectedDate,
      address: selectedOrderAddress.data
    }

    if(hour == "00" || !minute){
      Toast.show({
        type: 'error',
        text1: t("form.product.error.title"),
        text2: t("form.product.error.time")
      });
    }
    else if(Number(hour) > 12){
      Toast.show({
        type: 'error',
        text1: t("form.product.error.title"),
        text2: t("form.product.error.time2")
      });
    }
    else if(Number(minute) > 60){
      Toast.show({
        type: 'error',
        text1: t("form.product.error.title"),
        text2: t("form.product.error.time3")
      });
    }
    else if(selectedOrderAddress.data.length == 0){
      Toast.show({
        type: 'error',
        text1: t("form.product.error.title"),
        text2: t("form.product.error.pickup")
      });
    }
    else if(!selectedDate){
      Toast.show({
        type: 'error',
        text1: t("form.product.error.title"),
        text2: t("form.product.error.date")
      });
    }
    else{
      saveOrderDetails(CheckOutDetails)
      router.push(APP_ROUTES.CHECKOUTSUMMARY)
    }
  }

  return (
    <ScreenWrapper background={COLORS.light.primary} >
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t('Checkout.title')} />
        </ArchBorder>

        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        >
          <ScrollView style={styles.headerDesc} showsVerticalScrollIndicator={false}>
            <View>
              <Text className='font-black text-base'>{t("Checkout.sub-title")}</Text>
              <Text className='font-medium text-sm'>{t("Checkout.desc")}</Text>
            </View>

            <View style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
              
              <CheckoutTab handleLayout={handleLayout} setActive={setActive} active={active} handleSlide={handleSlide} xTabOne={xTabOne} xTabTwo={xTabTwo} translateX={translateX} />

              <View >
                <Animated.View
                  style={{
                      transform: [{ translateX: translateXTabOne }]
                  }}
                  onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
                >
                {active == 1 ? 
                  (<PickUp ampm={ampm} hour={hour} minute={minute} setHour={setHour} setMinute={setMinute} setSelectedDate={setSelectedDate} selectedDate={selectedDate} setAmpm={setAmpm} SetSelectedOrderAddress={SetSelectedOrderAddress} selectedOrderAddress={selectedOrderAddress} handleCheckout={goToSummary}/>)
                : 
                (
                  <></>
                )
                  }
                </Animated.View>
              </View>

              <View>
                <Animated.View
                style={{
                  transform: [
                    { translateX: translateXTabTwo },
                    { translateY: -translateY }
                  ],
                }}
                >
                  {active == 0 ? 
                    (
                      <Delivery ampm={ampm} hour={hour} minute={minute} setHour={setHour} setMinute={setMinute} setSelectedDate={setSelectedDate} selectedDate={selectedDate} setAmpm={setAmpm} SetSelectedOrderAddress={SetSelectedOrderAddress} selectedOrderAddress={selectedOrderAddress} handleCheckout={goToSummary}/>
                    )
                    : 
                    (
                      <></>
                    )
                  }
                </Animated.View>
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
        <CartToast />
      </View>
    </ScreenWrapper>
  );
};

export default CheckOut;
  
const styles = StyleSheet.create({
  headerDesc: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    flex: 1,
    minHeight: 0,
  }
});
