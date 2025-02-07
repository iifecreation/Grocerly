 import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import axiosInstance from '@/api/config';
import {NOTIFICATIONS_RESPONSE, NOTIFICATIONS_ACTION} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import getErrorMessage from '@/utils/error-formatter';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import {OtpInput} from 'react-native-otp-entry';
import {COLORS} from '@/theme/colors';
import AuthWrapper from '@/components/AuthWrapper';
import {APP_ROUTES} from '@/contants/app-routes';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import Button from '@/components/nativewindui/Button';
import FullPageLoader from '@/components/FullPageLoader';

const Verify = () => {
  const params = useLocalSearchParams();
  const {t} = useTranslation();
  const route = useRouter();
  const {
    handleSubmit,
    getValues,
    control,
    formState: {isDirty},
  } = useForm<{otp: string; email: string}>({
    defaultValues: {
      otp: '',
    },
  });
  const optVerificationMutation = useMutation({
    mutationFn: async data => {
      try {
        await axiosInstance.post(API_ROUTES.PASSWORD_RESET_TOKEN, data);
        route.push({
          pathname: APP_ROUTES.SET_PASSWORD,
          params: {otp: getValues().otp, email: params.email},
        });
        showMessage({
          message: t('networkRequest.success'),
          description: t('otp.message'),
          type: NOTIFICATIONS_ACTION.SUCCESS,
        });
      } catch (error: any) {
        console.log('🚀 ~ mutationFn: ~ error:', error);

        showMessage({
          message: NOTIFICATIONS_RESPONSE.ERROR,
          description: error?.message,
          type: NOTIFICATIONS_ACTION.DANGER,
        });
      }
    },
  });

  const onSubmit = (data: any) =>
    optVerificationMutation.mutate({...data, email: params.email});

  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.post(API_ROUTES.RESEND_TOKEN, {
          email: params.email,
        });

        showMessage({
          message: t('networkRequest.success'),
          description: t('otp.message'),
          type: NOTIFICATIONS_ACTION.SUCCESS,
        });
      } catch (error: any) {
        showMessage({
          message: NOTIFICATIONS_RESPONSE.ERROR,
          description: getErrorMessage(error?.error?.statusCode),
          type: NOTIFICATIONS_ACTION.DANGER,
        });
      }
    },
  });
  return (
    <AuthWrapper
      showContent={true}
      content={
        <View className="gap-y-4 ">
          <Text className="text-center  font-medium text-2xl leading-[40px] text-black">
            {t('auth.otp.header')}
          </Text>
          <Text className="text-center text-xs font-medium leading-4 text-black">
            {t('auth.otp.descriptions')}
          </Text>
        </View>
      }>
      {optVerificationMutation.isPending || resendOtpMutation.isPaused ? (
        <FullPageLoader />
      ) : null}
      <View className="w-full gap-y-3 mt-10 ">
        <Controller
          control={control}
          name="otp"
          render={({field: {onChange, onBlur, value}}) => (
            <OtpInput
              numberOfDigits={6}
              focusColor={COLORS.light.primary}
              autoFocus={false}
              hideStick={true}
              placeholder="******"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onBlur={onBlur}
              onFilled={onChange}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                pinCodeContainerStyle: styles.pinCodeContainer,
              }}
            />
          )}
        />
        <View className="flex-row justify-center mt-4">
          <Text className="font-normal text-black text-base leading-[25px]">
            {t('otp.dont')} {''}
          </Text>
          <TouchableOpacity onPress={() => resendOtpMutation.mutate()}>
            <Text
              className="font-bold text-base leading-[25px]"
              style={{color: COLORS.light.primary}}>
              {t('buttons.resend')}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full mt-20">
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty}
            isLoading={false}>
            <Text className="leading-4 text-xs  text-white font-semibold">
              {t('buttons.otp')}
            </Text>
          </Button>

          <View className="flex-row justify-center mt-4">
            <Text className="font-normal text-black text-base leading-[25px]">
              {t('auth.signup.account')} {''}
            </Text>
            <Link replace href={APP_ROUTES.LOGIN}>
              <Text
                className="font-bold text-base leading-[25px]"
                style={{color: COLORS.light.primary}}>
                {t('auth.signup.sign')}
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </AuthWrapper>
  );
};

export default Verify;

const styles = StyleSheet.create({
  pinCodeContainer: {
    width: 50,
    gap: 2,
  },
});
