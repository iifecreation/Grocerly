import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/theme/colors';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import DeliveryIcon from "@/components/icons/Delivery"
import PickUpIcon from "@/components/icons/pickUp"

const { width } = Dimensions.get("window");

const CheckOut = () => {
    const {t} = useTranslation();
    const [active, setActive] = useState(0);
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [translateY, setTranslateY] = useState(-1000);

    // Animated values using useRef to persist values across renders
    const translateX = useRef<Animated.Value>(new Animated.Value(0)).current;
    const translateXTabOne = useRef<Animated.Value>(new Animated.Value(0)).current;
    const translateXTabTwo = useRef<Animated.Value>(new Animated.Value(width)).current;

  // Slide animation handler
  // const handleSlide = (type: number) => {
  //     Animated.spring(translateX, {
  //         toValue: type,
  //         duration: 100
  //     }).start();

  //     if (active === 0) {
  //         Animated.parallel([
  //             Animated.spring(translateXTabOne, {
  //                 toValue: 0,
  //                 duration: 100
  //             }).start(),
  //             Animated.spring(translateXTabTwo, {
  //                 toValue: width,
  //                 duration: 100
  //             }).start()
  //         ]);
  //     } else {
  //         Animated.parallel([
  //             Animated.spring(translateXTabOne, {
  //                 toValue: -width,
  //                 duration: 100
  //             }).start(),
  //             Animated.spring(translateXTabTwo, {
  //                 toValue: 0,
  //                 duration: 100
  //             }).start()
  //         ]);
  //     }
  // };

  // Layout change handler for tabs
  // const handleLayout = (event: LayoutChangeEvent, tab: number) => {
  //   const { x } = event.nativeEvent.layout;
  //   if (tab === 1) {
  //       setXTabOne(x);
  //   } else {
  //       setXTabTwo(x);
  //   }
  // };

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t('Checkout.title')} />
        </ArchBorder>

        <View style={styles.headerDesc}>
          <View>
            <Text className='font-black text-base'>{t("Checkout.sub-title")}</Text>
            <Text className='font-medium text-sm'>{t("Checkout.desc")}</Text>
          </View>

          {/* <View style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                marginBottom: 20,
                height: 50,
                position: "relative"
              }}
            >
              <Animated.View
                style={{
                  position: "absolute",
                  width: "50%",
                  height: "70%",
                  top: 0,
                  left: 0,
                  backgroundColor: "#ffffff",
                  borderRadius: 4,
                  zIndex: 2,
                  transform: [{ translateX }],
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#EBFED9",
                }}
                onLayout={(event) => handleLayout(event, 1)}
                onPress={() => {
                  setActive(0);
                  handleSlide(xTabOne);
                }}
                className='rounded-l-full justify-center items-center flex-row gap-2 '
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
                  backgroundColor: "#EBFED9",
                }}
                onLayout={(event) => handleLayout(event, 2)}
                onPress={() => {
                  setActive(1);
                  handleSlide(xTabTwo);
                }}
                className='rounded-r-full justify-center items-center flex-row gap-2'
              >
                <View className='flex flex-row justify-center items-center w-[30] h-[30] rounded-full' style={{backgroundColor: "#FFEDEF"}}>
                  <PickUpIcon />
                </View>
                <Text style={{ color: active === 1 ? COLORS.light.primary : "#000000" }}>
                  {t("Checkout.tab_Pick_up")}
                </Text>
              </TouchableOpacity>
            </View>

              <ScrollView>
                <Animated.View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        transform: [{ translateX: translateXTabOne }]
                    }}
                    onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
                  >
                  <Text>Hi, I am a cute cat</Text>
                  <View style={{ marginTop: 20 }}>
                    
                  </View>
                </Animated.View>

                <Animated.View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [
                      { translateX: translateXTabTwo },
                      { translateY: -translateY }
                    ]
                  }}
                  >
                  <Text>Hi, I am a cute dog</Text>
                  <View style={{ marginTop: 20 }}>
                    
                  </View>
                </Animated.View>
              </ScrollView>
          </View> */}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default CheckOut;
  
  const styles = StyleSheet.create({
    headerDesc: {
      paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
      flex: 1
    }
  });
