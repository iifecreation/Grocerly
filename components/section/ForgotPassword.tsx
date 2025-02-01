import {View} from 'react-native';
import React from 'react';
import useYupValidationResolver from '@/hooks/useYupValidationResolver';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import axiosInstance from '@/api/config';
import {
  NOTIFICATIONS_RESPONSE,
  NOTIFICATIONS_ACTION,
  RESET_PASSWORD_PAGES,
} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import getErrorMessage from '@/utils/error-formatter';
import {showMessage} from 'react-native-flash-message';
import TextInputComp from '../Input';
import * as yup from 'yup';
import i18n from '@/i18n';
import {useTranslation} from 'react-i18next';
import AuthBottomWrapper from '../AuthBottomWrapper';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import ErrorMessage from '../nativewindui/ErrorMessage';
import BottomSheetInput from '../nativewindui/BottomSheetInput';

const Validation = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(i18n.t('form.errors.email')),
});

const ForgotPassword = ({
  handleUpdateActivePage,
}: {
  handleUpdateActivePage: (arg: {
    page: RESET_PASSWORD_PAGES;
    email: string;
  }) => void;
}) => {
  const yupResolver = useYupValidationResolver(Validation);
  const {t} = useTranslation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors, isDirty},
  } = useForm<{email: string}>({
    resolver: yupResolver,
    defaultValues: {
      email: '',
    },
  });
  const forgetPasswordMutation = useMutation({
    mutationFn: async data => {
      try {
        await axiosInstance.post(API_ROUTES.RESET_PASSWORD, data);
        showMessage({
          message: t('forgetPassword.passwordChangeSucess'),
          description: t('forgetPassword.message'),
          type: NOTIFICATIONS_ACTION.SUCCESS,
        });
        handleUpdateActivePage({
          page: RESET_PASSWORD_PAGES.RESET_PASSWORD,
          email: getValues().email,
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
  const onSubmit = (data: any) => forgetPasswordMutation.mutate(data);

  return (
    <AuthBottomWrapper
      header={t('forgetPassword.header')}
      description={t('forgetPassword.descriptions')}
      isDirty={isDirty}
      btnName={t('buttons.proceed')}
      isPending={forgetPasswordMutation.isPending}
      onPress={handleSubmit(onSubmit)}>
      <View className="w-full gap-y-3 mt-10">
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <>
              <BottomSheetInput
                placeholder={t('auth.login.email')}
                onChange={onChange}
                value={value}
                isPending={forgetPasswordMutation.isPending}
                errors={errors.email?.message}
              />
            </>
          )}
        />
      </View>
    </AuthBottomWrapper>
  );
};

export default ForgotPassword;
