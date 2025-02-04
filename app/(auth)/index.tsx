import React, {useCallback} from 'react';
import axiosInstance from '@/api/config';
import {
  NOTIFICATIONS_RESPONSE,
  NOTIFICATIONS_ACTION,
  RESET_PASSWORD_PAGES,
} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import useYupValidationResolver from '@/hooks/useYupValidationResolver';
import i18n from '@/i18n';
import {COLORS} from '@/theme/colors';
import getErrorMessage from '@/utils/error-formatter';
import {useMutation} from '@tanstack/react-query';
import Checkbox from 'expo-checkbox';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
  Text,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import * as yup from 'yup';
import useAuthToken from '@/hooks/useAuthToken';
import BottomSheetWrapper from '@/components/BottomSheetWrapper';
import FullPageLoader from '@/components/FullPageLoader';
import TextInputComp from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import ForgotPassword from '@/components/section/ForgotPassword';
import OTPVerification from '@/components/section/OTPVerification';
import ProceedToLogin from '@/components/section/ProceedToLogin';
import SetPassword from '@/components/section/SetPassword';
import {Link} from 'expo-router';
import {APP_ROUTES} from '@/contants/app-routes';
import AuthWrapper from '@/components/AuthWrapper';

type LoginFormProps = {
  email: string;
  password: string;
};

type ResetPassagesType = {
  page: RESET_PASSWORD_PAGES;
  email?: string;
  otp?: string;
};

const Validation = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(i18n.t('form.errors.email')),
  password: yup
    .string()
    .trim()
    .matches(/^(?=.{6,})/, i18n.t('form.errors.passwordLength'))
    .required(i18n.t('form.errors.password')),
});
const Login = () => {
  const {t} = useTranslation();
  const {updateToken} = useAuthToken();

  const [rememberMe, setRemember] = useState(false);
  const [ActivePage, setActivePage] = useState<ResetPassagesType>({
    page: RESET_PASSWORD_PAGES.LOGIN,
    email: '',
    otp: '',
  });

  function updateActivePage({page, email, otp}: ResetPassagesType) {
    setActivePage(() => ({page, email, otp}));
  }
  const yupResolver = useYupValidationResolver(Validation);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<LoginFormProps>({
    resolver: yupResolver,
    defaultValues: {
      email: 'decove@mailinator.com',
      password: 'Password!',
    },
  });
  const loginResponse = useMutation({
    mutationFn: async (data: {password: string; email: string}) => {
      try {
        const response = await axiosInstance.post(API_ROUTES.LOGIN, {
          password: data?.password,
          email: data?.email,
        });
        console.log(response?.data);
        const token = response?.data?.token;
        updateToken(token);
      } catch (error: any) {
        console.log('🚀 ~ mutationFn: ~ error:', error);
        showMessage({
          message: NOTIFICATIONS_RESPONSE.ERROR,
          description: getErrorMessage(error?.error?.statusCode),
          type: NOTIFICATIONS_ACTION.DANGER,
        });
      }
    },
  });

  const onSubmit = (data: any) => loginResponse.mutate(data);
  function onRememberMe() {
    setRemember(prevState => !prevState);
  }

  function onForgetPassword() {
    updateActivePage({
      page: RESET_PASSWORD_PAGES.FORGOT_PASSWORD,
    });
  }

  const handleSheetClose = useCallback(() => {
    setActivePage(() => ({
      page: RESET_PASSWORD_PAGES.LOGIN,
      email: '',
      otp: '',
    }));
  }, []);

  return (
    <ScreenWrapper>
      {loginResponse.isPending ? <FullPageLoader /> : null}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AuthWrapper>
          <View className="w-full gap-y-3 mt-14">
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputComp
                  placeholder={t('auth.login.email')}
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
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputComp
                  placeholder={t('auth.login.password')}
                  value={value}
                  handleBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  errorMessage={errors?.password?.message}
                  id="password"
                />
              )}
            />
          </View>
          {/* Remember Me and Forgot Password */}
          <View className="w-full flex flex-row justify-between items-center mt-2">
            <View className="flex-row items-center">
              <Checkbox
                value={rememberMe}
                onValueChange={onRememberMe}
                className="mr-2 "
              />
              <Text className="text-gray-600 text-sm leading-6 font-normal">
                {t('auth.login.remember')}
              </Text>
            </View>
            <TouchableOpacity onPress={onForgetPassword}>
              <Text
                className="font-bold text-xs leading-4"
                style={{color: COLORS.light.primary}}>
                {t('auth.login.forget')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View className="w-full mt-16">
            <Pressable
              onPress={handleSubmit(onSubmit)}
              className="h-11 py-0.5 w-full  rounded-[28px] items-center justify-center mt-4 "
              style={{backgroundColor: COLORS.light.primary}}>
              <Text className="leading-4 text-xs  text-white font-semibold">
                {t('buttons.login')}
              </Text>
            </Pressable>
            <View className="flex-row justify-center mt-4">
              <Text className="font-normal text-black text-base leading-[25px]">
                {t('auth.login.account')} {''}
              </Text>
              <Link push href={APP_ROUTES.CREATE_ACCOUNT}>
                <Text
                  className="font-bold text-base leading-[25px]"
                  style={{color: COLORS.light.primary}}>
                  {t('auth.login.sign')}
                </Text>
              </Link>
            </View>
          </View>

          {ActivePage.page != RESET_PASSWORD_PAGES.LOGIN ? (
            <BottomSheetWrapper
              activePage={ActivePage}
              onClose={handleSheetClose}>
              <ResetPasswordPageHandler
                ActivePage={ActivePage}
                updateActivePage={updateActivePage}
              />
            </BottomSheetWrapper>
          ) : null}
        </AuthWrapper>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Login;

type ResetPasswordPageHandlerProps = {
  ActivePage: ResetPassagesType;
  updateActivePage: (arg: ResetPassagesType) => void;
};
function ResetPasswordPageHandler({
  ActivePage,
  updateActivePage,
}: ResetPasswordPageHandlerProps) {
  if (ActivePage.page === RESET_PASSWORD_PAGES.LOGIN) {
    return <></>;
  }
  switch (ActivePage.page) {
    case RESET_PASSWORD_PAGES.FORGOT_PASSWORD:
      return <ForgotPassword handleUpdateActivePage={updateActivePage} />;
    case RESET_PASSWORD_PAGES.RESET_PASSWORD:
      return (
        <OTPVerification
          handleUpdateActivePage={updateActivePage}
          email={ActivePage.email as string}
        />
      );
    case RESET_PASSWORD_PAGES.SET_PASSWORD:
      return (
        <SetPassword
          handleUpdateActivePage={updateActivePage}
          data={ActivePage}
        />
      );
    case RESET_PASSWORD_PAGES.RESET_SUCCESSFULLY:
      return <ProceedToLogin handleUpdateActivePage={updateActivePage} />;

    default:
      break;
  }
}
