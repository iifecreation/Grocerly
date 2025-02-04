import {StyleSheet, View} from 'react-native';
import React, {ReactNode, useCallback, useMemo, useRef} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/utils';
import {COLORS} from '@/theme/colors';
import {Pressable} from 'react-native-gesture-handler';
import {RESET_PASSWORD_PAGES} from '@/contants';

type BottomSheetWrapperProps = {
  activePage: {page: RESET_PASSWORD_PAGES};
  onClose: () => void;
  children: ReactNode;
};
const BottomSheetWrapper = ({
  children,
  activePage,
  onClose,
}: BottomSheetWrapperProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => {
    if (activePage.page !== RESET_PASSWORD_PAGES.RESET_PASSWORD) {
      return ['50%'];
    } else {
      return ['80%'];
    }
  }, []);

  const handleSheetClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose();
  }, []);

  return (
    <Pressable style={styles.container} onPress={handleSheetClose}>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enableOverDrag={false}
        handleStyle={{display: 'none'}}>
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </Pressable>
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
