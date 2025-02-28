import { View, Dimensions, FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import Toast from 'react-native-toast-message';
import TextInputComp from '@/components/Input';
import { Controller, useForm } from 'react-hook-form';
import { COLORS } from '@/theme/colors';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { useTranslation } from 'react-i18next';
import Reviews from './Reviews';
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';

const widthScreen = Dimensions.get("window").width

const ProductReviews = ({item}: {item: any}) => {
    const {t} = useTranslation();
    const {control, handleSubmit, formState: {errors}, reset} = useForm();
    const [ratingValue, setRatingValue] = useState<number>(0);
    const listRef = useRef(null);

    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: response,
    } = useQuery({
        queryKey: [QUERY_ENUM.FETCHREVIEWSBYID],
        queryFn: async () => {
          return await axiosInstance.get(`${API_ROUTES.SENDREVIEWS}/${item.id}`);
        },
    });

    const reviewsData = useMemo(() => response?.data, [response]);

    const reviewsHandler = async (data: any) => {
    try {
        const payload = {
        user: data.user,
        review: data.review,
        rating: ratingValue,
        product: item?.id
        };
        const response = await axiosInstance.post(API_ROUTES.SENDREVIEWS, payload)
        if(response.status == 200 || response.data.status == "success"){
            Toast.show({
                type: 'success',
                text1: t('form.review.title'),
                text2: t('form.review.desc')
            });
            reset()
        }else{
            Toast.show({
                type: 'info',
                text1: t("form.server_error.title"),
                text2: t("form.server_error.desc")
            });
        }
        
    } catch (error) {
        console.error(error);
        Toast.show({
        type: 'error',
        text1: t("form.network.title"),
        text2: t("form.network.desc")
        });
    }
    }
  return (
    <View>
        <Text className='font-bold text-base mb-2'> {t("product.product-details.Reviews.title")}</Text>
        <Text className='text-gray-500'>{reviewsData?.user?.length} {t("product.product-details.Reviews.total")}</Text>

        <View className='mt-3 mb-6'>
        {
            isLoading || isFetching 
            ?
            (<ActivityIndicator size='large' />)
            : 
            error || isError 
            ?
            (
                <View></View>
            )
            :
            reviewsData?.user?.length == 0
            ?
            (
                <View></View>
            )
            : 
            (
                <FlatList
                    data={reviewsData?.user}
                    ref={listRef}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 10}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item})=> {
                        console.log(item?.user);
                        
                        return (
                    <View className='border-b border-b-gray-200 py-2'>
                        <Text className='font-bold capitalize text-base mb-1'>{item?.user?.fullName}</Text>
                        <Reviews readonly={true} setRatingValue={setRatingValue} startingValue={item?.rating} imageSize={12}  />
                        <Text className='text-black mt-3'>{item?.review}</Text>
                        <Text className='text-gray-500'>{t("product.product-details.Reviews.date")} {new Date(item?.createdAt).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        })}</Text>
                    </View>
                    )}}
                />
            )
        }
        </View>

    <View>
      <Text className='mt-5 text-base font-bold'>{t("product.product-details.Reviews.rate")}</Text>

        <View style={{paddingVertical: 20}}>
            <Reviews readonly={false} setRatingValue={setRatingValue} startingValue={0} imageSize={20}  />
        </View>

      <View className="w-full gap-y-3">
        <Controller
          control={control}
          name="user"
          rules={{
            required: t('form.Contact.error.name'),
            minLength: {
              value: 3,
              message: t('form.Contact.error.nameMinLength'),
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
          <TextInputComp
            placeholder={t('account.support.contact.form.input1')}
            value={value}
            handleBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors?.user?.message}
            id="user"
          />
          )}
        />

        <Controller
          control={control}
          name="review"
          rules={{
            required: t('form.Contact.error.message'),
          }}
          render={({field: {onChange, onBlur, value}}) => (
          <TextInputComp
            placeholder={t("product.product-details.Reviews.write")}
            className='h-40 pt-2'
            value={value}
            handleBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors?.review?.message}
            id="review"
            multiline={true}
          />
          )}
        />
      </View>

      <TouchableOpacity style={{borderColor: COLORS.light.primary, marginHorizontal: widthScreen / 7}} className='rounded-full border justify-center py-3 items-center mt-7' onPress={handleSubmit(reviewsHandler)}>
        <Text style={{color: COLORS.light.primary}} className='text-center text-base'>{t("button.Submit")}</Text>
      </TouchableOpacity>

    </View>
  </View>
  )
}

export default ProductReviews

const styles = StyleSheet.create({})