import React from 'react';
import axiosInstance from '@/api/config';
import {NOTIFICATIONS_RESPONSE, NOTIFICATIONS_ACTION} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import useYupValidationResolver from '@/hooks/useYupValidationResolver';
import i18n from '@/i18n';
import {COLORS} from '@/theme/colors';
import {useMutation} from '@tanstack/react-query';
import Checkbox from 'expo-checkbox';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, View, Text} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import FullPageLoader from '@/components/FullPageLoader';
import TextInputComp from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import * as yup from 'yup';
import AuthWrapper from '@/components/AuthWrapper';
import Button from '@/components/nativewindui/Button';
import {Link, useRouter} from 'expo-router';
import {APP_ROUTES} from '@/contants/app-routes';
import {Image, StyleSheet} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import {SAFE_AREA_PADDING} from '@/utils/utils';

type SignUpFormProps = {
  email: string;
};

const accountCreated = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {t} = useTranslation();
  const route = useRouter();

  const [agreeTerms, setAgreeTerms] = useState(false);

  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors},
  } = useForm<SignUpFormProps>({
    defaultValues: {
      email: '',
    },
  });
  const signResponse = useMutation({
    mutationFn: async data => {
      try {
        await axiosInstance.post(API_ROUTES.CREATE_ACCOUNT, data);
        route.push({
          pathname: APP_ROUTES.VERIFY_OTP,
          params: {
            email: getValues().email,
          },
        });
      } catch (error: any) {
        showMessage({
          message: NOTIFICATIONS_RESPONSE.ERROR,
          description: error?.message,
          type: NOTIFICATIONS_ACTION.DANGER,
        });
      }
    },
  });

  const onSubmit = (data: any) => signResponse.mutate(data);

  return (
    <ScreenWrapper>
      <ScrollView>
        <>
          <View
            className="h-full w-full justify-center items-center mt-10"
            style={{
              paddingHorizontal: SAFE_AREA_PADDING.paddingTop,
              paddingVertical: SAFE_AREA_PADDING.paddingTop,
            }}>
            {/* Image */}
            <Image
              source={require('@/assets/svg/Account-successful.png')}
              resizeMode="contain"
              className="w-full flex items-center justify-center "
            />
            {/* Heading */}
            <View className="mt-10">
              <Text
                className="text-3xl text-center"
                style={{
                  paddingHorizontal: SAFE_AREA_PADDING.paddingTop,
                }}>
                {t('auth.accountCreated.successful')}
              </Text>
              <View
                className="flex flex-row px-10 py-10"
                style={{
                  paddingHorizontal: SAFE_AREA_PADDING.paddingTop,
                }}>
                <View>
                  <Text className="text-sm text-black text-base leading-[25px]">
                    {t('auth.accountCreated.notifications')}
                  </Text>
                </View>
                <View className="mt-5">
                  <Switch
                    trackColor={{false: '#888', true: '#F15A22'}}
                    thumbColor="#fff"
                    ios_backgroundColor="#F15A22"
                    onValueChange={() => setIsEnabled(prev => !prev)}
                    value={isEnabled}
                    style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Button */}
          <View
            className="w-full"
            style={{
              paddingHorizontal: SAFE_AREA_PADDING.paddingTop,
            }}>
            <Button onPress={handleSubmit(onSubmit)}>
              <Text className="leading-4 text-xs text-white font-semibold">
                {t('auth.accountCreated.shopping')}
              </Text>
            </Button>
          </View>
        </>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default accountCreated;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom,
    fontFamily: 'Montserrat-Italic-VariableFont_wght',
  },
});
