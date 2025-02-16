import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface IconDetails {
    color: string
    children: React.ReactNode
};

const RoundedIcon: React.FC<IconDetails>  = ({color, children}) => {
  return (
    <View style={[styles.circle, {backgroundColor: color}]}>
        {children}
    </View>
  )
}

export default RoundedIcon

const styles = StyleSheet.create({
    circle:{
        width: 35,
        height: 35,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})