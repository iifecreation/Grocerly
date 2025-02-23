import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import commonStyles from '../styles/common';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const WalletCard = (
    {isLoading, isFetching, children}: 
    {isLoading: boolean, isFetching: boolean, children: ReactNode}) => {


  return (
    <View className='rounded-2xl overflow-hidden' style={[styles.wallet, commonStyles.shadow2]}>
      <View style={styles.circle}></View>
      <View style={styles.circle2}></View>

      {
        isLoading || isFetching ? (
            <ActivityIndicator size='large' className='items-center justify-center w-full' />
        )
        :
        (
            <>
                {children}
            </>
        )
      }
    </View>
  )
}

export default WalletCard

const styles = StyleSheet.create({
    wallet: {
        height: height * 0.3,
        width: "100%",
        position: 'relative',
        backgroundColor: "#FFF5ED",
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    circle: {
        height: width * 1,
        width: width * 1,
        position: 'absolute',
        backgroundColor: "#fff",
        borderRadius: 1000,
        left: -120,
        top: -40
    },
    circle2: {
        backgroundColor: "#F15A22aa",
        height: width * 0.6,
        width: width * 0.6,
        borderRadius: 1000,
        position: 'absolute',
        right: -140,
        top: -90
    },
})