import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { APP_ROUTES } from '@/contants/app-routes';
import { useRouter } from 'expo-router';

const PasswordSettings = () => {
    const {t} = useTranslation();
    const router = useRouter()
  
    return (
        <ScreenWrapper background={COLORS.light.primary}>
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t("account.Password_Email.title")} />
            </ArchBorder>

            <ScrollView style={styles.headerDesc} showsVerticalScrollIndicator={false}>

              <View className='w-full flex-row items-center justify-between border-b border-b-gray-200 gap-5 flex-1 pt-3 pb-6'>
                <View className='flex-1'>
                  <Text className='mb-2 font-medium text-base text-gray-700'>{t("account.Password_Email.card1.title")}</Text>
                  <Text className='text-gray-400 font-medium text-sm'>{t("account.Password_Email.card1.desc")}</Text>
                </View>

                <TouchableOpacity className='items-center justify-center border-2 border-gray-400 rounded-full' style={{width: 35, height: 35}} onPress={() => router.push(APP_ROUTES.CHANGE_PASSWORD)}>
                  <MaterialCommunityIcons name="square-edit-outline" size={20} color="#22222280" />
                </TouchableOpacity>
              </View>

              <View className='w-full flex-row items-center justify-between border-b border-b-gray-200 gap-5 flex-1 pt-6 pb-6'>
                <View className='flex-1'>
                  <Text className='mb-2 font-medium text-base text-gray-700'>{t("account.Password_Email.card2.title")}</Text>
                  <Text className='text-gray-400 font-medium text-sm'>{t("account.Password_Email.card2.desc")}</Text>
                </View>

                <TouchableOpacity className='items-center justify-center border-2 border-gray-400 rounded-full' style={{width: 35, height: 35}} onPress={() => router.push(APP_ROUTES.CHANGE_EMAIL)}>
                  <MaterialCommunityIcons name="square-edit-outline" size={20} color="#22222280" />
                </TouchableOpacity>
              </View>

              <View className='w-full flex-row items-center justify-between border-b border-b-gray-200 gap-5 flex-1 pt-6 pb-6'>
                <View className='flex-1'>
                  <Text className='mb-2 font-medium text-base text-gray-700'>{t("account.Password_Email.card3.title")}</Text>
                  <Text className='text-gray-400 font-medium text-sm'>{t("account.Password_Email.card3.desc")}</Text>
                </View>

                <TouchableOpacity>
                  <Text className='text-red-600 font-semibold text-sm'>{t("account.Password_Email.card3.btn")}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
        </View>
        </ScreenWrapper>
    )
}

export default PasswordSettings

const styles = StyleSheet.create({
    headerDesc: {
        width: "100%",
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    },
});