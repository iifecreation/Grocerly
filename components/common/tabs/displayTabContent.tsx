
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ProductReviews from '@/components/Reviews/ProductReviews';

const DisplayTabContent = ({activeTab, item}: {activeTab: string, item: any}) => {
  const listRef = useRef(null);

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
          <FlatList
            data={item?.nutritionalInformation}
            ref={listRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{rowGap: 20}}
            style={{marginBottom: 20}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=> (
              <View className='border-b border-b-gray-200 py-2'>
                <Text className='font-bold mb-1 capitalize text-sm'>{item?.key}</Text>
                <Text className='font-semibold text-sm'>{item?.value}g</Text>
              </View>
            )}
          />
        </View>
      );

    case "Reviews":
      return (
       <ProductReviews item={item} />
      );

    default:
      return null;
  }
}

export default DisplayTabContent

const styles = StyleSheet.create({})