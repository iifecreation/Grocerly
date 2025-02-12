import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { getUserLocation } from '@/utils/location';

const index = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<any>({});

  const fetchLocation = async () => {
    try {
      const locationData = await getUserLocation();
      setLocation(locationData);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocation()
  }, [])

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <ArchBorder>
        <Header location={`${location?.state}, ${location?.country}`} profilePic='https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg' setModalVisible={setModalVisible} />
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
      <Filter modalVisible={modalVisible} setModalVisible={setModalVisible} country={location?.country} state={location?.state} />
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


