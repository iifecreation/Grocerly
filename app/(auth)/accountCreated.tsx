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
            className="h-full w-full justify-center items-center mt-20"
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
            </View>
          </View>

          {/* Button */}
          <View
            style={{
              paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
              backgroundColor: COLORS.light.primary,
              padding: 15,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 30,
              borderRadius: 50,
              alignItems: 'center',
            }}>
            <Link href={APP_ROUTES.HOME}>
              <Text className="leading-4 text-xs text-white font-semibold rounded-[50px]">
                {t('auth.accountCreated.shopping')}
              </Text>
            </Link>
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
