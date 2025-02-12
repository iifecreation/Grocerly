import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from './Input';
import Checkbox from '../Checkbox';
import { COLORS } from '@/theme/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalComponent from '../common/Modal/Modal';
import { useTranslation } from 'react-i18next';
import LocationPicker from './Location';

interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  country: string;
  state: string;
}

const Filter: React.FC<ModalComponentProps> = ({modalVisible, setModalVisible, country, state }) => {
  const [selectedValue, setSelectedValue] = useState<string>('first');
  const [customerRatings, setCustomerRatings] = useState<string>('first');
  const [brand, setBrand] = useState<string>('first');
  const {t} = useTranslation();

  const discountOptions = [
    { text: t("product.filter.Discount.value1"), value: 'option1' },,
    { text: t("product.filter.Discount.value2"), value: 'option2' },
    { text: t("product.filter.Discount.value3"), value: 'option3' },
    { text: t("product.filter.Discount.value4"), value: 'option4' },
    { text: t("product.filter.Discount.value5"), value: 'option5' },
    { text: t("product.filter.Discount.value6"), value: 'option6' },
  ];
  
  const customerOptions = [
    { text: t("product.filter.Customer-Ratings.value1"), value: 'option1' },
    { text: t("product.filter.Customer-Ratings.value2"), value: 'option2' },
    { text: t("product.filter.Customer-Ratings.value3"), value: 'option3' },
    { text: t("product.filter.Customer-Ratings.value4"), value: 'option4' },
    { text: t("product.filter.Customer-Ratings.value5"), value: 'option5' }
  ];

  const brandOptions = [
    { text: t("product.filter.Brand.value1"), value: 'option1' },
    { text: t("product.filter.Brand.value2"), value: 'option2' },
    { text: t("product.filter.Brand.value3"), value: 'option3' },
    { text: t("product.filter.Brand.value4"), value: 'option4' },
    { text: t("product.filter.Brand.value5"), value: 'option5' },
    { text: t("product.filter.Brand.value6"), value: 'option6' },
  ];

  return (
    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} yourHeight={0.7}>
      <ScrollView className='w-full' showsVerticalScrollIndicator={false}>
        <View className='w-full'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='font-black text-lg mb-6'>{t("product.filter.title")}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Text className='mb-3 font-bold text-gray-700 text-base'>{t("product.filter.Location")}</Text>
            <LocationPicker country={country} state={state} />
          </View>

          <View className='mb-3'>
            <Text className='mb-2 font-bold text-gray-700 text-base'>{t("product.filter.Best-Prices")}</Text>

            <View className='flex flex-row justify-between items-center'>
                <Input title={t("product.filter.Minimum")} />
                <Input title={t("product.filter.Maximum")} />
            </View>
          </View>

          

          <View>
            <Text className='mb-2 font-bold text-gray-700 text-base'>{t("product.filter.Discount.title")}</Text>

            {discountOptions.map((option: any) => (
              <Checkbox
                key={option?.value}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                text={option?.text}
                value={option?.value}
              />
            ))}
          </View>

          <View className='mt-3'>
            <Text className='mb-2 font-bold text-gray-700 text-base'> {t("product.filter.Customer-Ratings.title")}</Text>

            {customerOptions.map((option) => (
              <Checkbox
                key={option.value}
                selectedValue={customerRatings}
                setSelectedValue={setCustomerRatings}
                text={option.text}
                value={option.value}
              />
            ))}
          </View>

          <View className='mt-3'>
            <Text className='mb-2 font-bold text-gray-700 text-base'> {t("product.filter.Brand.title")}</Text>

            {brandOptions.map((option) => (
              <Checkbox
                key={option.value}
                selectedValue={brand}
                setSelectedValue={setBrand}
                text={option.text}
                value={option.value}
              />
            ))}
          </View>

          <TouchableOpacity className='rounded-full py-2 my-8' style={{backgroundColor: COLORS.light.primary}}>
            <Text className='text-white text-center font-bold'>{t("button.Filter")}</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ModalComponent>
  )
}

export default Filter

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})