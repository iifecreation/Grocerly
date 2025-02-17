import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  const {t} = useTranslation();

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("account.Privacy.title")} />
        </ArchBorder>

        <View style={styles.headerDesc}>
          <Text className='text-center font-bold uppercase text-lg mb-3'>{t("account.Privacy.sub_title")}</Text>
        </View>

        <ScrollView style={styles.termsContent} showsVerticalScrollIndicator={false}>
          <Text className='mb-3 font-normal text-base text-justify'>{t("account.Privacy.desc1")}</Text>
          <Text className='mb-3 font-normal text-base text-justify'>{t("account.Privacy.desc2")}</Text>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  headerDesc: {
      position: "absolute",
      top: 150,
      zIndex: 10,
      width: "100%",
      paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
  termsContent: {
      paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
      flex: 1,
      marginTop: 10,
      marginBottom: 40
  }
});