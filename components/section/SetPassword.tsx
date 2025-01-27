import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
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
import BottomSheetInput from '../nativewindui/BottomSheetInput';

type setPasswordFormProps = {
  [x: string]: string;
};

type SetPasswordProps = {
  handleUpdateActivePage: (arg: {
    page: RESET_PASSWORD_PAGES;
    email: string;
  }) => void;
  data: {
    page: RESET_PASSWORD_PAGES;
    otp?: string | undefined;
    email?: string | undefined;
  };
};

const Validation = yup.object().shape({
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      i18n.t('form.errors.passwordLength'),
    )
    .required(i18n.t('form.errors.password')),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], i18n.t('form.errors.confirmPassword'))
    .required(),
});

const SetPassword = ({handleUpdateActivePage, data}: SetPasswordProps) => {
  const yupResolver = useYupValidationResolver(Validation);
  const {t} = useTranslation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors, isDirty},
  } = useForm<setPasswordFormProps>({
    resolver: yupResolver,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const setNewPassword = useMutation({
    mutationFn: async data => {
      try {
        await axiosInstance.post(API_ROUTES.NEW_PASSWORD_RESET, data);
        showMessage({
          message: t('forgetPassword.passwordChangeSucess'),
          description: t('forgetPassword.message'),
          type: NOTIFICATIONS_ACTION.SUCCESS,
        });
        handleUpdateActivePage({
          page: RESET_PASSWORD_PAGES.RESET_SUCCESSFULLY,
          email: '',
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
  const onSubmit = (reqData: any) =>
    setNewPassword.mutate({...reqData, otp: data?.otp, email: data?.email});

  return (
    <AuthBottomWrapper
      btnName={t('buttons.confirm')}
      header={t('createPassword.header')}
      description={t('createPassword.descriptions')}
      isDirty={isDirty}
      isPending={setNewPassword.isPending}
      onPress={handleSubmit(onSubmit)}>
      <View className="w-full mt-10 gap-y-1">
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (
            <BottomSheetInput
              placeholder={t('createPassword.placeholder1')}
              onChange={onChange}
              value={value}
              isPending={setNewPassword.isPending}
              errors={errors?.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({field: {onChange, value}}) => (
            <BottomSheetInput
              placeholder={t('createPassword.placeholder2')}
              onChange={onChange}
              value={value}
              isPending={setNewPassword.isPending}
              errors={errors?.confirmPassword?.message}
            />
          )}
        />
      </View>
    </AuthBottomWrapper>
  );
};

export default SetPassword;
