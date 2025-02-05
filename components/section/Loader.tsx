import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonLoader from 'expo-skeleton-loader';
import {SAFE_AREA_PADDING, SCREEN_WIDTH} from '@/utils/utils';

let size = 100;
let height = 20;
const AvatarLayout = () => (
  <SkeletonLoader boneColor="#f1f1f1" highlightColor="#e3e3e3">
    <SkeletonLoader.Container
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft / 2,
        columnGap: height / 2,
        // backgroundColor: 'black',
      }}>
      <SkeletonLoader.Item
        style={{
          width: SCREEN_WIDTH / 4,
          height: size,
        }}
      />
      <SkeletonLoader.Container style={{rowGap: 6}}>
        <SkeletonLoader.Container
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: SCREEN_WIDTH / 2.5,
            alignItems: 'center',
            columnGap: 6,
          }}>
          <SkeletonLoader.Item
            style={{
              width: 26,
              height: 26,
              borderRadius: size,
            }}
          />
          <SkeletonLoader.Item
            style={{
              width: SCREEN_WIDTH / 3.1,
              height: size / 5,
            }}
          />
        </SkeletonLoader.Container>

        <SkeletonLoader.Item style={{width: SCREEN_WIDTH / 2.5, height}} />
        <SkeletonLoader.Item style={{width: SCREEN_WIDTH / 2.5, height}} />
        <SkeletonLoader.Item style={{width: SCREEN_WIDTH / 2.5, height}} />
      </SkeletonLoader.Container>
      <SkeletonLoader.Container
        style={{
          width: SCREEN_WIDTH / 4,
          height: size,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <SkeletonLoader.Item style={{width: SCREEN_WIDTH / 2.5, height}} />
        <SkeletonLoader.Item style={{width: SCREEN_WIDTH / 2.5, height}} />
      </SkeletonLoader.Container>
    </SkeletonLoader.Container>
  </SkeletonLoader>
);

const numberOfPosts = new Array(10).fill(null);

function Loader() {
  return (
    <View style={styles.container}>
      {numberOfPosts.map((_, i) => (
        <AvatarLayout key={i} />
      ))}
    </View>
  );
}

export default React.memo(Loader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 30,
    paddingRight: SAFE_AREA_PADDING.paddingLeft / 2,
    rowGap: 20,
  },
});
