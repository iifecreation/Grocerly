import {StyleSheet, View} from 'react-native';
import React, {ReactNode, useCallback, useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/utils';
import {COLORS} from '@/theme/colors';

const BottomSheetWrapper = ({children}: {children: ReactNode}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        index={1}
        handleStyle={{display: 'none'}}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.light.primarytrans,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
