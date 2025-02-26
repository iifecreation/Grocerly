import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Rating } from 'react-native-ratings'
import { COLORS } from '@/theme/colors'

const Reviews = ({setRatingValue, readonly, startingValue, imageSize}: 
    {setRatingValue: Dispatch<SetStateAction<number>>, readonly: boolean, startingValue: number, imageSize: number}) => {
  return (
    <Rating
        imageSize={imageSize}
        startingValue={startingValue}
        ratingColor={COLORS.light.primary}
        ratingBackgroundColor={COLORS.light.primary}
        ratingCount={5}
        fractions={2}
        onFinishRating={(rating: number) => setRatingValue(rating) }
        style={{
        alignItems: "flex-start",
        }}
        readonly={readonly}
    />
  )
}

export default Reviews

const styles = StyleSheet.create({})