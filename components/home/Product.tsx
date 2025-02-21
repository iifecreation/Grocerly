import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native'
import React, { useRef } from 'react'
import ProductCard from '../common/cards/ProductCard';

// Get screen width
const screenWidth = Dimensions.get('window').width;

const Product = ({orderList, onEndReachedFunc, isFetchingNextPage}: {orderList: any, onEndReachedFunc?: () => void, isFetchingNextPage?: boolean}) => {
  const listRef = useRef(null);

  const showProduct = ({ item }: { item: any }) => {  
    return (<ProductCard item={item} />)
  }

  const numColumns = screenWidth < 768 ? 2 : 3;

  return (
    <View style={{flex: 1}}>
      <FlatList 
        ref={listRef}
        data={orderList}
        numColumns={numColumns}
        keyExtractor={(_, id) => id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{columnGap: 10, rowGap: 15, width: "100%", }}
        columnWrapperStyle={{justifyContent: "space-between", columnGap: 10, rowGap: 15 }}
        renderItem={showProduct}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReachedFunc}
        ListFooterComponent={() => {
          if (isFetchingNextPage) return <ActivityIndicator />
      }}
      />
    </View>
  )
}

export default Product

