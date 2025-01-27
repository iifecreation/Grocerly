import React, {  useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import { StyleSheet, TouchableOpacity, View, Image, Pressable, ScrollView} from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import { useTranslation } from 'react-i18next';
import TextInputComp from '@/components/Input';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import useYupValidationResolver from '@/hooks/useYupValidationResolver';
import Checkbox from 'expo-checkbox';
import i18n from '@/i18n';
import { useMutation } from '@tanstack/react-query';
import FullPageLoader from '@/components/FullPageLoader';
import axiosInstance from '@/api/config';
import { NOTIFICATIONS_RESPONSE, NOTIFICATIONS_ACTION } from '@/contants';
import { API_ROUTES } from '@/contants/api-routes';
import getErrorMessage from '@/utils/error-formatter';
import { showMessage } from 'react-native-flash-message';
import Login from '@/components/section/Login';
import ForgetPassword from '@/components/BottomSheetWrapper';

export default function index() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* <Onboarding /> */}
        <Login />
      </View>
    </ScreenWrapper>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textSkip: {
    color: '#F15A22',
    marginLeft: 300,
    textDecorationLine: 'underline',
  },
});
