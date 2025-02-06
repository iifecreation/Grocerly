import React from 'react'
import Garins from "../icons/Grains"
import Food from "../icons/food"
import Beverages from "../icons/Beverages"
import Spices from "../icons/spices"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Category() {
  return (
    <View style={styles.main}>
        <Text className='font-black mb-4 text-lg'>Categories</Text>

        <FlatList
        horizontal
        data={categoryItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginRight: 20, alignItems: 'center' }}>
            <View className='mb-3'>{item.image}</View>
            <Text className='text-gray-200'>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Category

const categoryItem = [
    {
        id: 1,
        name: "Bakery & Grains",
        image: <Garins />
    },
    {
        id: 1,
        name: "Bakery & Grains",
        image: <Food />
    },
    {
        id: 1,
        name: "Bakery & Grains",
        image: <Beverages />
    },
    {
        id: 1,
        name: "Bakery & Grains",
        image: <Spices />
    }
]

const styles = StyleSheet.create({
  main: {
    marginTop: 220
  }
});


