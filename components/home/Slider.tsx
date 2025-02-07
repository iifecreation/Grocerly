import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '@/theme/colors';
import { SAFE_AREA_PADDING } from '@/utils/utils';

const imageUrls = [
    require('../../assets/home/home1.png'),
    require('../../assets/home/home2.png'),
    require('../../assets/home/home3.png'),
];

const { width } = Dimensions.get('window');


const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    
    // Automatically change the image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
        }, 3000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Scroll to the current index whenever it changes
    useEffect(() => {
        if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
            index: currentIndex,
            animated: true,
        });
        }
    }, [currentIndex]);

    const renderIndicators = () => {
        return imageUrls.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => onIndicatorPress(index)}>
            <View
              style={[
                styles.indicator,
                currentIndex === index ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          </TouchableOpacity>
        ));
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} className='rounded-2xl'/>
          </View>
        );
      };
    
      const onIndicatorPress = (index: number) => {
        setCurrentIndex(index);
      };

  return (
    <View className='rounded-2xl w-full' style={styles.slider}>
        <View style={styles.sliderContainer}>
          <FlatList
            ref={flatListRef}
            data={imageUrls}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            onScrollToIndexFailed={(info) => {
              console.log('Failed to scroll to index:', info);
            }}
            getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
            extraData={currentIndex}
          />
          <View style={styles.indicatorContainer}>
            {renderIndicators()}
          </View>
        </View>
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
    slider:{
        position: "absolute",
        zIndex: 4,
        left: 0,
        top: -30,
        width: width,
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    },
    sliderContainer: {
      backgroundColor: "#fff",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    imageContainer: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
      width: width,
      height: 200,
      resizeMode: 'cover',
    },
    indicatorContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    indicator: {
      width: 10,
      height: 10,
      margin: 5,
      borderRadius: 5,
    },
    activeIndicator: {
      backgroundColor: COLORS.light.primary,
      width: 12,
      height: 12,
    },
    inactiveIndicator: {
      backgroundColor: '#D9D9D9',
    },
  });