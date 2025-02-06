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

type SignUpFormProps = {
  email: string;
};

const Validation = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(i18n.t('form.errors.email')),
});
const Signup = () => {
  const {t} = useTranslation();
  const route = useRouter();

  const [agreeTerms, setAgreeTerms] = useState(false);

  const yupResolver = useYupValidationResolver(Validation);
  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors},
  } = useForm<SignUpFormProps>({
    resolver: yupResolver,
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

  function onAgreedTerms() {
    setAgreeTerms(prevState => !prevState);
  }

  return (
    <ScreenWrapper>
      {signResponse.isPending ? <FullPageLoader /> : null}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AuthWrapper>
          <>
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
            </View>

            {/* Terms and conditions */}
            <View className="w-full flex flex-row justify-between items-center mt-2">
              <View className="flex-row items-center">
                <Checkbox
                  value={agreeTerms}
                  onValueChange={onAgreedTerms}
                  className="mr-2 "
                />
                <Text className="text-gray-600 text-sm leading-5 font-medium">
                  {t('auth.terms.header')}
                  <Text className="text-blue-600 text-sm font-normal">
                    {' '}
                    {t('auth.terms.descriptions')}
                  </Text>
                  <Text className="text-gray-600 text-sm  font-medium">
                    {' '}
                    {t('auth.terms.name')}
                  </Text>
                </Text>
              </View>
            </View>

            <View className="w-full mt-24">
              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={!agreeTerms}
                isLoading={false}>
                <Text className="leading-4 text-xs  text-white font-semibold">
                  Sign up
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
                <Link href={APP_ROUTES.ACCOUNT_CREATED}>
                  <Text
                    className="font-bold text-base leading-[25px]"
                    style={{color: COLORS.light.primary}}>
                    created
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

export default Signup;
