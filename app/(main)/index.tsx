import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ArchBorder from '@/components/ArchBorder';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import Header from '@/components/home/header';
import Filter from '@/components/Filter/Filter';
import Slider from '@/components/home/Slider';
import {SAFE_AREA_PADDING} from '@/utils/utils';
import Category from '@/components/home/category';
import Product from '@/components/home/Product';
import CartToast from '@/components/common/toasts/CartToast';

const index = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <ArchBorder>
        <Header location='Ipoh, Malaysia' profilePic='https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg' setModalVisible={setModalVisible} />
      </ArchBorder>
      <View style={styles.main}>
        {/* Home Banner */}
        <Slider />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* category section slider  */}
          <Category />

          {/* display product section */}
          <Product />
        </ScrollView>

      </View>
      <Filter modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <CartToast />
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    backgroundColor: "#fff",
    flex: 1
  }
});


