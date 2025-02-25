import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState, } from 'react'
import { SAFE_AREA_PADDING } from '@/utils/utils';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import ProductDetailsTab from '@/components/common/tabs/ProductDetailsTab';
import DisplayTabFinance from '@/components/common/tabs/DisplayTabFinance';
import CartToast from '@/components/common/toasts/CartToast';

const { width } = Dimensions.get('window');

const Finance = () => {
  const {t} = useTranslation();
  const tabs = [t('Finance.tab.one'), t('Finance.tab.two'), t('Finance.tab.three')];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  
  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("Finance.title")} />
        </ArchBorder>

        <View style={styles.wallet}>

          <View style={styles.walletTab}>
            <ProductDetailsTab
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </View>

          <ScrollView style={styles.finance} showsVerticalScrollIndicator={false}>
            <DisplayTabFinance activeTab={activeTab} />
          </ScrollView>
          
        </View>

        <CartToast />
      </View>
    </ScreenWrapper>
  );
}

export default Finance


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