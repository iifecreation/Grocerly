import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import axiosInstance from '@/api/config';
import {
  NOTIFICATIONS_RESPONSE,
  NOTIFICATIONS_ACTION,
  BOTTOM_WRAPPER_PAGES,
} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import getErrorMessage from '@/utils/error-formatter';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import AuthBottomWrapper from '../AuthBottomWrapper';
import {OtpInput} from 'react-native-otp-entry';
import {COLORS} from '@/theme/colors';

const OTPVerification = ({
  handleUpdateActivePage,
  email,
}: {
  handleUpdateActivePage: (arg: {
    page: BOTTOM_WRAPPER_PAGES;
    email: string;
    otp: string;
  }) => void;
  email: string;
}) => {
  const {t} = useTranslation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: {isDirty},
  } = useForm<{otp: string; email: string}>({
    defaultValues: {
      otp: '',
      email,
    },
  });
  const optVerificationMutation = useMutation({
    mutationFn: async data => {
      try {
        await axiosInstance.post(API_ROUTES.PASSWORD_RESET_TOKEN, data);
        showMessage({
          message: t('networkRequest.success'),
          description: t('otp.message'),
          type: NOTIFICATIONS_ACTION.SUCCESS,
        });
        handleUpdateActivePage({
          page: BOTTOM_WRAPPER_PAGES.SET_PASSWORD,
          email: getValues().email,
          otp: getValues().otp,
        });
      } catch (error: any) {
        showMessage({
          message: NOTIFICATIONS_RESPONSE.ERROR,
          type: NOTIFICATIONS_ACTION.DANGER,
        });
      }
    },
  });

  const onSubmit = (data: any) =>
    optVerificationMutation.mutate({...data, email});

  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.post(API_ROUTES.RESEND_TOKEN, {email});
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
    <AuthBottomWrapper
      header={t('otp.header')}
      description={t('otp.descriptions')}
      isDirty={isDirty}
      isPending={
        optVerificationMutation.isPending || resendOtpMutation.isPending
      }
      onPress={handleSubmit(onSubmit)}
      btnName={t('buttons.otp')}>
      <View className="w-full gap-y-3 mt-10">
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
      </View>
    </AuthBottomWrapper>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  pinCodeContainer: {
    width: 50,
    gap: 2,
  },
});
