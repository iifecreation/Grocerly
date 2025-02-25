import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
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
import CustomButton from '@/components/CustomButton';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';

const EditPersonalDetails = () => {
    const {t} = useTranslation();
    const {userData} = useAuthStore();
    const router = useRouter()
    const {control, handleSubmit, formState: {errors}, reset} = useForm();
    const [imageUri, setImageUri] = useState(null);

    // const requestPermissions = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //       Alert.alert('Permission denied', 'We need access to your media library to select a picture.');
    //     }
    // };

    const editProfileHandle = () => {

    }
  
    return (
        <ScreenWrapper background={COLORS.light.primary}>
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t("account.Personal_Details.editDetails.title")} />
            </ArchBorder>

            <ScrollView style={styles.headerDesc} showsVerticalScrollIndicator={false}>
              <View className='items-center relative justify-center'>
                <Image source={{uri: userData?.image?.url}} style={{width: 120, height: 120, borderRadius: 100}} />

                <TouchableOpacity style={{width: 40, height: 40}} className='bg-white rounded-full items-center justify-center absolute'>
                    <EvilIcons name="camera" size={24} color="black" />
                </TouchableOpacity>
              </View>

                <View className='mt-4 pb-12'>
                    <Controller
                        control={control}
                        name="First_Name"
                        rules={{
                        required: "First Name is required",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t("account.Personal_Details.First_Name")}
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.Amount?.message}
                            id="First_Name"
                        />
                        )}
                    />

                    <Controller
                        control={control}
                        name="Last_Name"
                        rules={{
                        required: "First Name is required",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t("account.Personal_Details.Last_Name")}
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.Amount?.message}
                            id="Last_Name"
                        />
                        )}
                    />

                        <Controller
                        control={control}
                        name="Phone_Number"
                        rules={{
                        required: "First Name is required",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t("account.Personal_Details.First_Name")}
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.Amount?.message}
                            id="Phone_Number"
                        />
                        )}
                    />
                    <CustomButton navigateProps={editProfileHandle} textProps={t("button.Submit")} />
                </View>
            </ScrollView>
        </View>
        </ScreenWrapper>
    )
}

export default EditPersonalDetails

const styles = StyleSheet.create({
    headerDesc: {
        width: "100%",
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    },
});