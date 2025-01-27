import i18n from '@/i18n';
import {ImageSourcePropType} from 'react-native';

export type ImageSliderType = {
  id: any;
  title: string;
  image: ImageSourcePropType;
  descriptions: string;
};

export const ImageSlider = [
  {
    id: 1,
    title: i18n.t('onboarding.one.header'),
    image: require('@/assets/Screen1.png'),
    descriptions: i18n.t('onboarding.one.descriptions'),
  },
  {
    id: 2,
    title: i18n.t('onboarding.two.header'),
    image: require('@/assets/Screen2.png'),
    descriptions: i18n.t('onboarding.two.descriptions'),
  },
  {
    id: 3,
    title: i18n.t('onboarding.three.header'),
    image: require('@/assets/Screen3.png'),
    descriptions: i18n.t('onboarding.three.descriptions'),
  },
];
