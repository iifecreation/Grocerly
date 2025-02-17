import { Animated, Dimensions, Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';
import NoAddressIcon from "@/components/icons/no_address"
import CustomButton from '@/components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get("window");

const CheckOut = () => {
  const {t} = useTranslation();
  const [active, setActive] = useState(0);
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [getAddress, setGetAddress] = useState([])
  const router = useRouter()

  // Animated values using useRef to persist values across renders
  const translateX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const translateXTabOne = useRef<Animated.Value>(new Animated.Value(0)).current;
  const translateXTabTwo = useRef<Animated.Value>(new Animated.Value(width)).current;

  // Slide animation handler
  const handleSlide = (type: number) => {
      Animated.spring(translateX, {
        toValue: type,
        duration: 100,
        useNativeDriver: true,
      }).start();

      if (active === 0) {
        Animated.parallel([
          Animated.spring(translateXTabOne, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
          }).start(),
          Animated.spring(translateXTabTwo, {
              toValue: width,
              duration: 100,
              useNativeDriver: true,
          }).start()
        ]);
      } else {
          Animated.parallel([
              Animated.spring(translateXTabOne, {
                  toValue: -width,
                  duration: 100,
                  useNativeDriver: true,
              }).start(),
              Animated.spring(translateXTabTwo, {
                  toValue: 0,
                  duration: 100,
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

  const setUpAddress = () => {
    router.push(APP_ROUTES.ADDRESS)
  }

  return (
    <ScreenWrapper background={COLORS.light.primary} >
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t('Checkout.title')} />
        </ArchBorder>

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
                <PickUp />
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
                
                {
                  getAddress?.length === 0 ? (
                    <View className='flex-1 items-center justify-center mt-7'>
                      <NoAddressIcon />
                      <Text className='text-base text-center font-bold mt-5'>{t("Checkout.Delivery.Setup_Delivery.title")}</Text>
                      <Text className='text-base text-center font-normal mt-2'>{t("Checkout.Delivery.Setup_Delivery.desc")}</Text>

                      <CustomButton navigateProps={setUpAddress} textProps={t("button.Setup_Address")}>
                        <Ionicons name="location-outline" size={24} color="#ffffff" />
                      </CustomButton>
                    </View>
                  )
                  : (
                    <Delivery />
                  )
                }
              </Animated.View>
            </View>
          </View>

        </ScrollView>
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
