import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ProductDetailsTab from '@/components/common/tabs/ProductDetailsTab';
import DisplayTabSupport from '@/components/common/tabs/DisplayTabSupport';
import CartToast from '@/components/common/toasts/CartToast';

const { width } = Dimensions.get('window');

const Support = () => {
  const {t} = useTranslation();
  const tabs = [t('account.support.tab.col1'), t('account.support.tab.col2')];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
        <MainPageHeader name={ activeTab == "Contact Us" ? t("account.support.title1"): t("account.support.title2") } />
        </ArchBorder>
        
        <View style={styles.wallet}>
          <View style={styles.walletTab}>
            <ProductDetailsTab
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </View>

          
          <View style={styles.finance} >
            <DisplayTabSupport activeTab={activeTab} />
          </View>

        </View>
        <CartToast />
      </View>
    </ScreenWrapper>
  )
}

export default Support

const styles = StyleSheet.create({
  wallet: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    backgroundColor: "#fff",
    flex: 1
  },
  walletTab: {
    position: "absolute",
    zIndex: 4,
    left: 0,
    top: -55,
    width: width,
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  finance: {
    flex: 1,
  }
});