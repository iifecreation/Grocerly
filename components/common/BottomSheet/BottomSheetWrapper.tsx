import { StyleSheet, Text, View } from 'react-native'
import React, { Children, ReactNode, useRef } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { SAFE_AREA_PADDING } from '@/utils/utils';

const BottomSheetWrapper = ({children, bottomSheetRef} :
    {children: ReactNode, bottomSheetRef: React.MutableRefObject<BottomSheet>}) => {
    
    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

  return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // -1 means hidden initially
        snapPoints={["60%"]}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.container}>
            {children}
        </BottomSheetView>
      </BottomSheet>
  )
}

export default BottomSheetWrapper

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight, 
    }
})