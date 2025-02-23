import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useMemo, useRef, } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import RedeemIcon from "@/components/icons/Redeem"
import ReferIcon from "@/components/icons/Refer";
import ShopIcon from "@/components/icons/Shop";
import EarnIcon from "@/components/icons/Earn";
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';


const HowWorks = () => {
  const {t} = useTranslation();
  const listRef = useRef(null)
  const router = useRouter()

  const howdata = [
    {
      id: 1,
      title: t("Finance.How_works.list1.title"),
      desc: t("Finance.How_works.list1.desc"),
      icon: <ReferIcon color="#F15A22" />
    },
    {
      id: 2,
      title: t("Finance.How_works.list2.title"),
      desc: t("Finance.How_works.list2.desc"),
      icon: <EarnIcon />
    },
    {
      id: 3,
      title: t("Finance.How_works.list3.title"),
      desc: t("Finance.How_works.list3.desc"),
      icon: <RedeemIcon color="#F15A22"  />
    },
    {
      id: 4,
      title: t("Finance.How_works.list4.title"),
      desc: t("Finance.How_works.list4.desc"),
      icon: <ShopIcon />
    }
  ]
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.How_works.title")} />
        </ArchBorder>

        <ScrollView style={styles.headerDesc}>
          <Text className='text-center text-base font-medium mb-4'>{t("Finance.How_works.sub")}</Text>

          <FlatList
            ref={listRef}
            data={howdata}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item, index})=> {
              const isLastItem = index === howdata.length - 1;
              return (
              <View className='flex-row gap-5' >
                <View className='items-center'>
                  <View className='bg-gray-200 items-center justify-center rounded-full w-12 h-12'>
                    <Text className='text-base font-bold'>{item.id}</Text>
                  </View>

                  {!isLastItem && <View className='bg-gray-500 w-1 flex-1' ></View>}
                </View>

                <View className='pb-10' style={{alignSelf: "flex-start", alignContent: "flex-start"}}>
                  <View className='flex-row gap-3 items-center mb-2'>
                    {item.icon}
                    <Text className='text-base font-bold' style={{color: COLORS.light.primary}}>{item.title}</Text>
                  </View>
                  <Text className='text-gray-500'>{item.desc}</Text>
                </View>
              </View>
            )}}
          />

          <View className='flex-row justify-between items-center'>
            <TouchableOpacity className='flex-row items-center gap-3 rounded-full justify-center py-3 px-5' style={{backgroundColor: COLORS.light.primary}} onPress={() => router.push(APP_ROUTES.REFEREARN)} >
              <ReferIcon color="#FAFAFA" />
              <Text className='text-white font-bold capitalize text-base'>{t("button.Refer_Earn")}</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3 border px-5' style={{borderColor: COLORS.light.primary}} onPress={() => router.push(APP_ROUTES.REDEEM)} >
              <RedeemIcon color="#F15A22" />
              <Text className='text-white font-bold capitalize text-base' style={{color: COLORS.light.primary }}>{t("button.Redeem")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

export default HowWorks

const styles = StyleSheet.create({
  headerDesc: {
    flex: 1,
    width: "100%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  }
});