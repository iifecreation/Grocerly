import { ImageSourcePropType } from 'react-native';

export type ImageSliderType = {
  id: any;
  title: string;
  image: ImageSourcePropType;
  descriptions: string;
};

export const ImageSlider = [
  {
    title: 'Enjoy One-Stop Shop For Fresh Groceries',
    image: require('@/assets/Screen1.png'),
    descriptions:
      "From juicy fruits and crisp vegetables to premium meats and pantry staples, we've got everything you need.",
  },
  {
    title: 'Your Grocery Delivery Superhero',
    image: require('@/assets/Screen2.png'),
    descriptions:
      'Tired of lugging heavy bags home from the grocery store? Let us do the heavy lifting!',
  },
  {
    title: 'Fresh Groceries, Delivered To Your Door',
    image: require('@/assets/Screen3.png'),
    descriptions:
      'Enjoy the convenience of fresh, high-quality groceries delivered right to your doorstep, whenever you need them.',
  },
];
