import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import TextInputComp from '@/components/Input';
import {CountryPicker} from "react-native-country-codes-picker";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomButton from '@/components/CustomButton';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../nativewindui/ErrorMessage';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import Toast from 'react-native-toast-message';

const Contact = () => {
    const {control, handleSubmit, formState: {errors}, reset} = useForm();
    const {t} = useTranslation();
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+343');
    const [countryFlag, setCountryFlag] = useState<string | null>( "🏴󠁧󠁢󠁥󠁮󠁧󠁿");

    const contactHandler = async (data: any) => {
        try {
            const payload = {
                name: data.name,
                email: data.email,
                phone: `${countryCode}${data.phone}`, 
                message: data.message,
            };

            const response = await axiosInstance.post(API_ROUTES.CONTACT_US, payload)
            console.log(response?.data);
            if(response.status == 200 || response.data.status == "success"){
                Toast.show({
                    type: 'success',
                    text1: t('form.Contact.success.title'),
                    text2: t('form.Contact.success.desc')
                });
                reset()
            }else{
                Toast.show({
                    type: 'info',
                    text1: t("form.server_error.title"),
                    text2: t("form.server_error.desc")
                });
            }
            
        } catch (error) {
            console.log(error);
            Toast.show({
            type: 'error',
            text1: t("form.network.title"),
            text2: t("form.network.desc")
            });
        }
    }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
    >
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >

            <View className='mt-8 w-full'>
                <Text className='text-gray-500 text-center mb-3 font-medium text-sm'>{t("account.support.contact.address")}</Text>
                <Text className='text-gray-500 text-center font-medium text-sm'>{t("account.support.contact.call")}</Text>
                <Text className='text-gray-500 text-center mb-4 font-medium text-sm'>{t("account.support.contact.email")}</Text>
                <Text className='text-gray-700 text-center mb-4 font-bold text-base'>{t("account.support.contact.form.title")}</Text>

                <View className="w-full gap-y-3">
                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: t('form.Contact.error.name'),
                            minLength: {
                              value: 3,
                              message: t('form.Contact.error.nameMinLength'),
                            },
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t('account.support.contact.form.input1')}
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.name?.message}
                            id="name"
                        />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: t('form.Contact.error.email'),
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: t('form.Contact.error.invalidEmail'),
                            },
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t('account.support.contact.form.input2')}
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.email?.message}
                            id="email"
                        />
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        rules={{
                            required: t('form.Contact.error.phone'),
                            minLength: {
                                value: 7,
                                message: t('form.Contact.error.phoneMinLength'),
                            },
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <View className='mb-5'>
                                <View className='flex-row items-center border rounded-[4px] w-full border-gray-300 px-3'>
                                    <Text>{countryFlag}</Text>
                                    <TouchableOpacity onPress={() => setShow(true)} className='border-r border-r-gray-500 px-2' >
                                        <FontAwesome name="angle-down" size={24} color="#414141" />
                                    </TouchableOpacity>
                                    <Text className='text-base font-medium ps-2'>{countryCode}</Text>
                                    <TextInput
                                        className=
                                            " h-12 w-full px-2 placeholder:text-base font-normal placeholder:leading-[25px] placeholder:text-gray-500"
                                        placeholder={t('account.support.contact.form.input3')}
                                        value={value}
                                        keyboardType='numeric'
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        
                                    />
                                </View>
                                {errors?.phone?.message && <ErrorMessage errorMessage={`${errors?.phone?.message}`} />}
                            </View>
                        )}
                    />
                    

                    <Controller
                        control={control}
                        name="message"
                        rules={{
                            required: t('form.Contact.error.message'),
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                        <TextInputComp
                            placeholder={t('account.support.contact.form.input4')}
                            className='h-40'
                            value={value}
                            handleBlur={onBlur}
                            onChangeText={onChange}
                            errorMessage={errors?.message?.message}
                            id="message"
                            multiline={true}
                        />
                        )}
                    />
                </View>

                <CustomButton navigateProps={handleSubmit(contactHandler)} textProps={t("button.Submit")} />

                <View>
                    <CountryPicker
                        lang='en'
                        show={show}
                        pickerButtonOnPress={(item) => {
                            console.log(item);
                            setCountryFlag(item.flag)
                            setCountryCode(item.dial_code);
                            setShow(false);
                        }}
                    />
                </View>
            </View>

        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Contact

const styles = StyleSheet.create({})