
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DisplayTabContent = ({activeTab, item}: {activeTab: string, item: any}) => {
    switch (activeTab) {
        case "Description":
          return (
            <View>
              <Text>{item?.description}</Text>
            </View>
          );
    
        case "Nutritional Information":
          return (
            <View>
    
            </View>
          );
    
        case "Reviews":
          return (
            <View>
              <Text className='font-bold text-base mb-2'>Customer Reviews</Text>
              <Text className='text-gray-500'>{item?.rating} nationwide reviews</Text>
            </View>
          );
    
        default:
          return null;
      }
}

export default DisplayTabContent

const styles = StyleSheet.create({})