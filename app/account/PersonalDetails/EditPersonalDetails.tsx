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
// import DatePicker from 'react-native-date-picker'
import Feather from '@expo/vector-icons/Feather';

const EditPersonalDetails = () => {
    const {t} = useTranslation();
    const {userData} = useAuthStore();
    const router = useRouter()
    const {control, handleSubmit, formState: {errors}, reset} = useForm();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const pickImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
    
          if (!result.canceled) {
            setImageUri(result.assets[0].uri);
          }
        } catch (error) {
          console.log('Error picking image:', error);
        }
    };

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
                <Image source={{uri: imageUri ? imageUri : userData?.image?.url}} style={{width: 120, height: 120, borderRadius: 100}} />

                <TouchableOpacity style={{width: 40, height: 40}} className='bg-white rounded-full items-center justify-center absolute' onPress={pickImage}>
                    <EvilIcons name="camera" size={24} color="black" />
                </TouchableOpacity>
              </View>

                <View className='mt-4 pb-12'>
                    <Controller
                        control={control}
                        name="fullName"
                        rules={{
                            required: t('form.Contact.error.name'),
                            minLength: {
                              value: 3,
                              message: t('form.Contact.error.nameMinLength'),
                            },
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t("account.Personal_Details.Full_Name")}
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.fullName?.message}
                            id="fullName"
                        />
                        )}
                    />

                    <Controller
                        control={control}
                        name="phoneNumber"
                        rules={{
                            required: t('form.Contact.error.phone'),
                            minLength: {
                                value: 7,
                                message: t('form.Contact.error.phoneMinLength'),
                            },
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t("account.Personal_Details.Phone_Number")}
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.phoneNumber?.message}
                            id="phoneNumber"
                        />
                        )}
                    />

                    <View className="border rounded-[4px] h-12 w-full px-4 placeholder:text-base font-normal flex-row items-center justify-between border-gray-300">
                        <Text className='text-gray-500 text-base'>{t("account.Personal_Details.DOB")}</Text>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <Feather name="calendar" size={24} color="#5E6368" />
                        </TouchableOpacity>
                    </View>

                    <CustomButton navigateProps={editProfileHandle} textProps={t("button.Submit")} />
                </View>
            </ScrollView>

            {/* <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            /> */}
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