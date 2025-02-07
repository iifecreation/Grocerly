import { StyleSheet, Text, View } from 'react-native'
import React, { Children, ReactNode, useRef } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const BottomSheetWrapper = ({children} :
    {children: ReactNode}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    
    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

  return (
    <View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // -1 means hidden initially
        snapPoints={["50%"]}
        enablePanDownToClose
      >
        <BottomSheetView>
            {children}
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default BottomSheetWrapper

const styles = StyleSheet.create({})