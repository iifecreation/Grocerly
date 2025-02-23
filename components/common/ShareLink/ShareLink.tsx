import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import RedeemIcon from "@/components/icons/Redeem"
import ReferIcon from "@/components/icons/Refer";
import ShopIcon from "@/components/icons/Shop";
import EarnIcon from "@/components/icons/Earn";
import { FlatList } from 'react-native';
import { COLORS } from '@/theme/colors';

const ShareLinkComp = () => {
    const {t} = useTranslation();
    const listRef = useRef(null)
    const shareDate = [
        {
            id: 1,
            title: t("Finance.Share.col1.title"),
            desc: t("Finance.Share.col1.desc"),
            icon: <ReferIcon color="#F15A22" />,
            iconBackground: "#FFEDEF",
            background: "#F9F9F9"
        },
        {
            id: 2,
            title: t("Finance.Share.col2.title"),
            desc: t("Finance.Share.col2.desc"),
            icon: <EarnIcon color="#FA8707" />,
            iconBackground: "#FEEED5",
            background: "#FFF8F0"
        },
        {
            id: 3,
            title: t("Finance.Share.col3.title"),
            desc: t("Finance.Share.col3.desc"),
            icon: <RedeemIcon color="#295200"  />,
            iconBackground: "#C2FFC7",
            background: "#EFFBE3"
        },
        {
            id: 4,
            title: t("Finance.Share.col4.title"),
            desc: t("Finance.Share.col4.desc"),
            icon: <ShopIcon />,
            iconBackground: "#FFEDEF",
            background: "#FFEDEF49"
        },
    ]
  return (
    <View>
      <FlatList
            ref={listRef}
            data={shareDate}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{gap: 10}}
            renderItem={({item})=> (
              <View className='flex-row gap-3 items-center px-3 rounded-md py-2 w-full flex-1' style={{backgroundColor: item?.background }} >
                <View className='items-center justify-center rounded-xl w-12 h-12' style={{backgroundColor: item?.iconBackground }}>
                  {item?.icon}
                </View>

                <View className='flex-1'>
                    <Text className='text-base font-bold' >{item.title}</Text>
                    <Text className='text-xs font-medium' >{item.desc}</Text>
                </View>
              </View>
            )}
        />
        <View className='bg-gray-200 w-full h-1 mt-5'></View>
    </View>
  )
}

export default ShareLinkComp

const styles = StyleSheet.create({})