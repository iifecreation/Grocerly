import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {SAFE_AREA_PADDING, SCREEN_WIDTH} from '@/utils/utils';
import {ImageSliderType} from '@/lib/data';

type Props = {
  item: ImageSliderType;
  index: number;
};

const SliderItem: React.FC<Props> = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.descriptions}</Text>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: SCREEN_WIDTH,
    height: '100%',
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 2,
    lineHeight: 30,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'left',
    color: '#000',
    fontWeight: '400',
  },
});
