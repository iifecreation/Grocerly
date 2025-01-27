import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {COLORS} from '@/theme/colors';
import {SCREEN_WIDTH} from '@/utils/utils';

type Props = {
  length: number;
  x: Animated.SharedValue<number>;
  color: string;
};

const Pagination: React.FC<Props> = ({x, length}) => {
  const PaginationComponent = useCallback(({index}: {index: number}) => {
    const itemRnStyle = useAnimatedStyle(() => {
      const width = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [15, 15, 15],
        Extrapolate.CLAMP,
      );

      const bgColor = interpolateColor(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [COLORS.light.grey, COLORS.light.primary, COLORS.light.grey],
      );

      return {
        width,
        backgroundColor: bgColor,
      };
    }, [x]);
    return <Animated.View style={[styles.itemStyle, itemRnStyle]} />;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {Array.from({length}).map((_, index) => {
          return <PaginationComponent index={index} key={index} />;
        })}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: COLORS.light.grey,
    height: 15,
    width: 15,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  activeDot: {
    backgroundColor: COLORS.light.primary,
  },
  itemStyle: {
    width: 15,
    height: 15,
    borderRadius: 23,
    marginHorizontal: 3,
  },
});
