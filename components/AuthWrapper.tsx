import {View, Text, Image, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {SAFE_AREA_PADDING} from '@/utils/utils';

type AuthWrapperType = {
  children: ReactNode;
  content?: ReactNode;
  showContent?: boolean;
};

const AuthWrapper = ({
  children,
  content,
  showContent = false,
}: AuthWrapperType) => {
  const {t} = useTranslation();
  return (
    <View
      className="h-full w-full justify-center items-center"
      style={styles.container}>
      <View className="flex items-center  justify-center">
        <Image
          source={require('@/assets/svg/logo.png')}
          resizeMode="contain"
          className="w-24 flex items-center justify-center "
        />
        {!showContent ? (
          <>
            <Text className="text-center font-medium text-2xl leading-[40px] text-black">
              {t('auth.login.header')}
            </Text>
            <Text className="text-center text-xs font-medium leading-4 text-black">
              {t('auth.login.descriptions')}
            </Text>
          </>
        ) : (
          content
        )}
      </View>
      {children}
    </View>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom,
  },
});
