import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {ImageSliderType} from './SliderData';

type Props = {
  item: ImageSliderType;
  index: number;
};

const {width} = Dimensions.get('screen');
const IMAGE_HEIGHT_RATIO = 0.5;

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
    width,
    height: width * IMAGE_HEIGHT_RATIO,
    marginTop: 300,
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300, 
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'left',
    color: '#000',
    fontWeight: '300',
  },
});
