import React from 'react';
import axiosInstance from '@/api/config';
import {NOTIFICATIONS_RESPONSE, NOTIFICATIONS_ACTION} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import useYupValidationResolver from '@/hooks/useYupValidationResolver';
import i18n from '@/i18n';
import {COLORS} from '@/theme/colors';
import {useMutation} from '@tanstack/react-query';
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
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import {APP_ROUTES} from '@/contants/app-routes';
import getErrorMessage from '@/utils/error-formatter';

type setPasswordFormProps = {
  [x: string]: string;
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
const Password = () => {
  const {t} = useTranslation();
  const route = useRouter();
  const params = useLocalSearchParams();

  const yupResolver = useYupValidationResolver(Validation);
  const {
    handleSubmit,
    control,

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
          message: t('createPassword.success'),
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
  const onSubmit = (reqData: any) =>
    setNewPassword.mutate({...reqData, otp: params?.otp, email: params?.email});

  return (
    <ScreenWrapper>
      {setNewPassword.isPending ? <FullPageLoader /> : null}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AuthWrapper
          showContent={true}
          content={
            <View className="gap-y-4 ">
              <Text className="text-center  font-medium text-2xl leading-[40px] text-black">
                {t('auth.newPassword.header')}
              </Text>
              <Text className="text-center text-xs font-medium leading-4 text-black">
                {t('auth.newPassword.descriptions')}
              </Text>
            </View>
          }>
          <>
            <View className="w-full mt-10 gap-y-1">
              <Controller
                control={control}
                name="password"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputComp
                    placeholder={t('createPassword.placeholder1')}
                    onChangeText={onChange}
                    value={value}
                    handleBlur={onBlur}
                    errorMessage={errors?.password?.message}
                    id="password"
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputComp
                    placeholder={t('createPassword.placeholder2')}
                    onChangeText={onChange}
                    value={value}
                    handleBlur={onBlur}
                    errorMessage={errors?.confirmPassword?.message}
                    id={'confirmPassword'}
                  />
                )}
              />
            </View>

            <View className="w-full mt-24">
              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={!isDirty}
                isLoading={false}>
                <Text className="leading-4 text-xs  text-white font-semibold">
                  {t('buttons.proceed')}
                </Text>
              </Button>

              <View className="flex-row justify-center mt-4">
                <Text className="font-normal text-black text-base leading-[25px]">
                  {t('auth.signup.account')} {''}
                </Text>
                <Link href={APP_ROUTES.LOGIN}>
                  <Text
                    className="font-bold text-base leading-[25px]"
                    style={{color: COLORS.light.primary}}>
                    {t('auth.signup.sign')}
                  </Text>
                </Link>
              </View>
            </View>
          </>
        </AuthWrapper>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Password;
