import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {ImageSlider, ImageSliderType} from './SliderData';
import SliderItem from './SliderItem';
import {FlashList} from '@shopify/flash-list';
import Pagination from './Pagination';
import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

type Props = {
  itemList: ImageSliderType[];
};

const Onboarding = ({itemList}: Props) => {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);

  return (
    <View
      style={{
        marginTop: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlashList
        data={ImageSlider}
        renderItem={({item, index}) => <SliderItem item={item} index={index} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
      />
      <Pagination items={itemList} scrollX={scrollX} paginationIndex={paginationIndex} />
    </View>
  );
};

export default Onboarding;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
