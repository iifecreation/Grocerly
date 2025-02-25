import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useMemo, useState, } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import DiscountIcon from '@/components/icons/Discount';
import CustomButton from '@/components/CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Controller, useForm } from 'react-hook-form';
import TextInputComp from '@/components/Input';
import { API_ROUTES } from '@/contants/api-routes';
import axiosInstance from '@/api/config';
import ModalComponent from '@/components/common/Modal/Modal';
import Toast from 'react-native-toast-message';
import CartToast from '@/components/common/toasts/CartToast';
import { StripeProvider,confirmPayment } from '@stripe/stripe-react-native';

const TopUpWallet = () => {
  const {t} = useTranslation();
  const {control, handleSubmit, formState: {errors}, reset} = useForm();
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirmPaymentValue, setconfirmPaymentValue] = useState({
    paymentIntentId: '',
    transactionId: ''
  });
  
  const topWallet = async (data: any) => {

    if (!data.amount) {
      return;
    }

    const amountAsNumber = Number(data.amount);
    const formData = {
      ...data, 
      amount: amountAsNumber,
      tranId: "jifuiuiufd77789suvusdf",
    };
    
    try {
      const response = await axiosInstance.post(API_ROUTES.POST_TOP_WALLET, formData)
      console.log(response?.data?.data);
      const paymentIntentId = response?.data?.data?.paymentIntents;
      if(response.status == 200){
        setconfirmPaymentValue((prevState) => ({
          paymentIntentId: paymentIntentId,
          transactionId: response?.data?.data?.transactionId
        }) )
        setModalVisible(!isModalVisible)
        reset()
      }else{
        Toast.show({
          type: 'error',
          text1: 'Form Error',
          text2: "Invalid amount valid",
        });
      }
      
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: "Unable to processed your request"
      });
    }
  }

  const handleConfirmPayment = async () => {
    try {
      console.log(confirmPaymentValue);
      
      const response = await axiosInstance.post(API_ROUTES.POST_CONFIRM_TOP_UP, confirmPaymentValue )

      console.log(response);
      
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: "Unable to confirm your request"
      });
    }
  }
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.TopUpWallet.title")} />
        </ArchBorder>

        <View style={styles.headerDesc}>
          <View className='flex-row gap-3'>
            <DiscountIcon />
            <View>
              <Text className='font-bold text-black mb-1 text-base'>{t("Finance.TopUpWallet.title2")}</Text>
              <Text className='text-gray-500'>{t("Finance.TopUpWallet.desc")}</Text>
            </View>
          </View>

          <View className='mt-7'>
            <Text className='text-gray-500 mb-2'>{t("Finance.TopUpWallet.input")}</Text>

            <View>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: "Amount is required", 
                  validate: value => {
                    return !isNaN(value) && value !== '' ? true : 'Amount must be a valid number';
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                <TextInputComp
                  placeholder=''
                  value={value}
                  handleBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors?.Amount?.message}
                  id="amount"
                  keyboardType="numeric"
                />
                )}
              />
            </View>

            <View className='flex-row justify-between gap-3 items-center py-4 '>
              <Image source={require("@/assets/payment/stripe.png")}  />
              <Text className='text-black font-bold flex-1'>{t("Finance.TopUpWallet.pay_desc")}</Text>
            </View>

            <CustomButton navigateProps={handleSubmit(topWallet)} textProps={t("button.Pay")}>
              <MaterialIcons name="payment" size={24} color="#ffffff" />
            </CustomButton>
          </View>
        </View>

        <ModalComponent modalVisible={isModalVisible} setModalVisible={setModalVisible} yourHeight={0.3}>
          <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} className='mb-10'>
            <MaterialIcons name="cancel" size={24} color="black" />
          </TouchableOpacity>

          <CustomButton navigateProps={handleConfirmPayment} textProps={t("button.confirm_payment")}>
            <MaterialIcons name="payment" size={24} color="#ffffff" />
          </CustomButton>
        </ModalComponent>

        <CartToast />
      </View>
    </ScreenWrapper>
  );
}

export default TopUpWallet

const styles = StyleSheet.create({
  headerDesc: {
    // position: "absolute",
    flex: 1,
    // top: 150,
    zIndex: 10,
    width: "100%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
  finance: {
    flex: 1
  }
});