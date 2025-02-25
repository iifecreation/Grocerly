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

const ChangeEmail = () => {
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
              
            
            </ScrollView>
        </View>
        </ScreenWrapper>
    )
}

export default ChangeEmail

const styles = StyleSheet.create({
    headerDesc: {
        width: "100%",
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    },
});