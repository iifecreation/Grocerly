import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { useAuthStore } from '@/store/store';
import AntDesign from '@expo/vector-icons/AntDesign';
import { APP_ROUTES } from '@/contants/app-routes';
import { useRouter } from 'expo-router';

const PersonalDetails = () => {
    const {t} = useTranslation();
    const {userData} = useAuthStore();
    const router = useRouter()
  
    return (
        <ScreenWrapper background={COLORS.light.primary}>
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t("account.Personal_Details.title")} />
            </ArchBorder>

            <ScrollView style={styles.headerDesc} showsVerticalScrollIndicator={false}>
              <View className='items-center'>
                <Image source={{uri: userData?.image?.url}} style={{width: 120, height: 120, borderRadius: 100}} />

                <View className='flex-row items-center gap-3 mt-5'>
                    <TouchableOpacity onPress={() => router.push(APP_ROUTES.EDIT_PERSONAL_DETAILS)}>
                        <AntDesign name="edit" size={28} color="#00000066" />
                    </TouchableOpacity>
                    <Text className='text-gray-500'>{t("account.Personal_Details.edit")}</Text>
                </View>
              </View>

              <View className='mt-4 pb-12'>
                <View className='border-b border-b-gray-200 py-2 mb-3'>
                    <Text className='text-gray-500 mb-2 font-medium'>{t("account.Personal_Details.First_Name")}</Text>
                    <Text className='text-base font-medium capitalize text-black'>{userData?.fullName.split(" ")[0]}</Text>
                </View>

                <View className='border-b border-b-gray-200 py-2 mb-3'>
                    <Text className='text-gray-500 mb-2 font-medium'>{t("account.Personal_Details.Last_Name")}</Text>
                    <Text className='text-base font-medium capitalize text-black'>{userData?.fullName.split(" ")[1]}</Text>
                </View>

                <View className='border-b border-b-gray-200 py-2 mb-3'>
                    <Text className='text-gray-500 mb-2 font-medium'>{t("account.Personal_Details.Email_Address")}</Text>
                    <Text className='text-base font-medium capitalize text-black'>{userData?.email}</Text>
                </View>

                <View className='border-b border-b-gray-200 py-2 mb-3'>
                    <Text className='text-gray-500 mb-2 font-medium'>{t("account.Personal_Details.Phone_Number")}</Text>
                    <Text className='text-base font-medium capitalize text-black'>{userData?.phoneNumber}</Text>
                </View>

                <View className='border-b border-b-gray-200 py-2 mb-3'>
                    <Text className='text-gray-500 mb-2 font-medium'>{t("account.Personal_Details.DOB")}</Text>
                    <Text className='text-base font-medium capitalize text-black'>
                        {new Date(userData?.dob).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        })}
                    </Text>
                </View>
              </View>
            
            </ScrollView>
        </View>
        </ScreenWrapper>
    )
}

export default PersonalDetails

const styles = StyleSheet.create({
    headerDesc: {
        width: "100%",
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    },
});