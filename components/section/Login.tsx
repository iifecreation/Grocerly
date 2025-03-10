import React, {useCallback} from 'react';
import axiosInstance from '@/api/config';
import {
  NOTIFICATIONS_RESPONSE,
  NOTIFICATIONS_ACTION,
  BOTTOM_WRAPPER_PAGES,
} from '@/contants';
import {API_ROUTES} from '@/contants/api-routes';
import useYupValidationResolver from '@/hooks/useYupValidationResolver';
import i18n from '@/i18n';
import {COLORS} from '@/theme/colors';
import getErrorMessage from '@/utils/error-formatter';
import {SAFE_AREA_PADDING} from '@/utils/utils';
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
  Image,
  Text,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import FullPageLoader from '../FullPageLoader';
import TextInputComp from '../Input';
import ScreenWrapper from '../ScreenWrapper';
import * as yup from 'yup';
import BottomSheetWrapper from '../BottomSheetWrapper';
import ForgotPassword from './ForgotPassword';
import OTPVerification from './OTPVerification';
import SetPassword from './SetPassword';
import ProceedToLogin from './ProceedToLogin';
import useAuthToken from '@/hooks/useAuthToken';
import {useAuthStore} from '@/store/store';

type LoginFormProps = {
  email: string;
  password: string;
};

type ResetPassagesType = {
  page: BOTTOM_WRAPPER_PAGES;
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
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      i18n.t('form.errors.passwordLength'),
    )
    .required(i18n.t('form.errors.password')),
});
const Login = () => {
  const {t} = useTranslation();
  const {updateToken} = useAuthToken();

  const [rememberMe, setRemember] = useState(false);
  const [ActivePage, setActivePage] = useState<ResetPassagesType>({
    page: BOTTOM_WRAPPER_PAGES.LOGIN,
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
      email: 'thomas@skyventures.vc',
      password: 'Test@1234',
    },
  });
  const loginResponse = useMutation({
    mutationFn: async data => {
      try {
        const response = await axiosInstance.post(API_ROUTES.TEST_LOGIN, {
          password: data?.password,
          username: data?.email,
        });
        const token = response?.data?.token;
        updateToken(token);
      } catch (error: any) {
        console.log('🚀 ~ Login ~ error:', error);
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
      page: BOTTOM_WRAPPER_PAGES.FORGOT_PASSWORD,
    });
  }

  const handleSheetClose = useCallback(() => {
    setActivePage(() => ({
      page: BOTTOM_WRAPPER_PAGES.LOGIN,
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
        <View
          className="h-full w-full justify-center items-center"
          style={{
            paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
            paddingBottom: SAFE_AREA_PADDING.paddingBottom,
          }}>
          <View className="flex items-center justify-center">
            <Image
              source={require('@/assets/svg/logo.png')}
              resizeMode="contain"
              className="w-32 flex items-center justify-center "
            />
            <Text className="text-center font-medium text-2xl leading-[40px] text-black">
              {t('auth.login.header')}
            </Text>
            <Text className="text-center text-xs font-medium leading-4 text-black">
              {t('auth.login.descriptions')}
            </Text>
          </View>
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
          <View className="w-full mt-10">
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
              <TouchableOpacity>
                <Text
                  className="font-bold text-base leading-[25px]"
                  style={{color: COLORS.light.primary}}>
                  {t('auth.login.sign')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {ActivePage.page != BOTTOM_WRAPPER_PAGES.LOGIN ? (
        <BottomSheetWrapper activePage={ActivePage} onClose={handleSheetClose}>
          <ResetPasswordPageHandler
            ActivePage={ActivePage}
            updateActivePage={updateActivePage}
          />
        </BottomSheetWrapper>
      ) : null}
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
  if (ActivePage.page === BOTTOM_WRAPPER_PAGES.LOGIN) {
    return <></>;
  }
  console.log(ActivePage);
  switch (ActivePage.page) {
    case BOTTOM_WRAPPER_PAGES.FORGOT_PASSWORD:
      return <ForgotPassword handleUpdateActivePage={updateActivePage} />;
    case BOTTOM_WRAPPER_PAGES.RESET_PASSWORD:
      return (
        <OTPVerification
          handleUpdateActivePage={updateActivePage}
          email={ActivePage.email as string}
        />
      );
    case BOTTOM_WRAPPER_PAGES.SET_PASSWORD:
      return (
        <SetPassword
          handleUpdateActivePage={updateActivePage}
          data={ActivePage}
        />
      );
    case BOTTOM_WRAPPER_PAGES.RESET_SUCCESSFULLY:
      return <ProceedToLogin handleUpdateActivePage={updateActivePage} />;

    default:
      break;
  }
}
