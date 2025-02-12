import React from 'react'
import Grains from "../icons/Grains"
import Food from "../icons/food"
import Beverages from "../icons/Beverages"
import Spices from "../icons/spices"
import Meat from "../icons/Meat"
import Dairy from "../icons/dairy"
import DryFoods from "../icons/DryFoods"
import FrozenFoods from "../icons/FrozenFoods"

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

function Category() {
   const {t} = useTranslation();

  const categoryItem = [
    {
        id: 1,
        name: t("product.Categories.Bakery"),
        color: "#D7F8FF",
        image: <Grains />
    },
    {
        id: 2,
        name: t("product.Categories.Health"),
        color: "#FDEDCC",
        image: <Food />
    },
    {
        id: 3,
        name: t("product.Categories.Beverages"),
        color: "#EDFEDC",
        image: <Beverages />
    },
    {
        id: 4,
        name: t("product.Categories.Spices"),
        color: "#FFEDEF",
        image: <Spices />
    },
    {
      id: 5,
      name: t("product.Categories.Meat"),
      color: "#FDD3BC",
      image: <Meat />
    },
    {
        id: 6,
        name: t("product.Categories.Dairy"),
        color: "#D3F9FF",
        image: <Dairy />
    },
    {
        id: 7,
        name: t("product.Categories.Dry-Foods"),
        color: "#FDEDCC",
        image: <DryFoods />
    },
    {
        id: 8,
        name: t("product.Categories.Frozen-Foods"),
        color: "#EDFEDC",
        image: <FrozenFoods />
    }
  ]

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
            <View className='mb-3 flex justify-center items-center rounded-full' style={{backgroundColor: item.color, width: 70, height: 70}}>{item.image}</View>
            <Text className='text-gray-500'>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  main: {
    marginTop: 220
  }
});


