import React, { useMemo } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { QUERY_ENUM } from '@/contants'
import axiosInstance from '@/api/config'
import { API_ROUTES } from '@/contants/api-routes'
import { useRouter } from 'expo-router'
import { APP_ROUTES } from '@/contants/app-routes'

function Category() {
  const {t} = useTranslation();
  const router = useRouter()

   const {
    isLoading,
    isFetching,
    error,
    isError,
    data: data,
  } = useQuery({
    queryKey: [QUERY_ENUM.CATEGORY],
    queryFn: async () => {
      return await axiosInstance.get(API_ROUTES.FETCH_CATEGORY);
    },
  });
  const categoryList = useMemo(() => data?.data, [data]);
  
  const randomColor = () => {
    const categoryColor = ["#D7F8FF", "#FDEDCC", "#EDFEDC", "#FFEDEF", "#FDD3BC", "#D3F9FF","#FDEDCC", "#EDFEDC"]
    let choose = Math.floor(Math.random() * categoryColor.length)
    return categoryColor[choose]
  }

  return (
    <View>
      <Text className='font-black mb-3 text-lg'>{t("product.Categories.title")}</Text>

      {isLoading || isFetching ? (
        <ActivityIndicator size={'large'}  />
      ) : isError || categoryList?.data?.data?.length == 0 ? (
        <Text className='text-center font-bold text-lg'>{t("product.Categories.notAvailable")}</Text>
      ) : (
        <FlatList
          horizontal
          data={categoryList?.data?.data}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginRight: 10, alignItems: 'center' }}
              onPress={() => router.push({
                pathname: APP_ROUTES.PRODUCT_BY_CATEGORY,
                params: {
                  id: item?.id
                }
              })}
            >
              <View className='mb-3 flex justify-center items-center rounded-full' style={{backgroundColor: randomColor(), width: 60, height: 60}}>
                <Image source={{uri : item?.avatar?.url}} width={40} height={40} style={{objectFit: "cover"}} />
              </View>
              <Text className='text-gray-500'>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      )
      }
    </View>
  )
}

export default Category

