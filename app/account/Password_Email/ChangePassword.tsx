import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
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
import { Controller, useForm } from 'react-hook-form';
import TextInputComp from '@/components/Input';

const ChangePassword = () => {
    const {t} = useTranslation();
    const {userData} = useAuthStore();
    const {control, handleSubmit, formState: {errors}, reset} = useForm();
    const router = useRouter()
  
    return (
        <ScreenWrapper background={COLORS.light.primary}>
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t("account.Personal_Details.title")} />
            </ArchBorder>
 
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.headerDesc}>
                    <View className="w-full gap-y-3">
                        <Controller
                            control={control}
                            name="oldPassword"
                            render={({field: {onChange, onBlur, value}}) => (
                            <TextInputComp
                                placeholder={t('account.Password_Email.Change_Password.input1')}
                                value={value}
                                handleBlur={onBlur}
                                onChangeText={onChange}
                                secureTextEntry={true}
                                errorMessage={errors?.email?.message}
                                id="password"
                            />
                            )}
                        />

                        <Controller
                            control={control}
                            name="newPassword"
                            render={({field: {onChange, onBlur, value}}) => (
                            <TextInputComp
                                placeholder={t('account.Password_Email.Change_Password.input2')}
                                value={value}
                                handleBlur={onBlur}
                                onChangeText={onChange}
                                secureTextEntry={true}
                                errorMessage={errors?.password?.message}
                                id="password"
                            />
                            )}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
        </ScreenWrapper>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    headerDesc: {
        flex: 1,
        width: "100%",
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    },
});