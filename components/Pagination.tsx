import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {ImageSliderType} from './SliderData';

type Props = {
  items: ImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination: React.FC<Props> = ({items, paginationIndex, scrollX}) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, paginationIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  dot: {
    backgroundColor: '#aaa',
    height: 8,
    width: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  activeDot: {
    backgroundColor: '#F15A22',
    width: 16,
  },
});