import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from './Input';
import Checkbox from '../Checkbox';
import { COLORS } from '@/theme/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalComponent from '../common/Modal/Modal';

interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter: React.FC<ModalComponentProps> = ({modalVisible, setModalVisible}) => {
  const [selectedValue, setSelectedValue] = useState<string>('first');
  const [customerRatings, setCustomerRatings] = useState<string>('first');

  return (
    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} yourHeight={0.7}>
      <ScrollView className='w-full' showsVerticalScrollIndicator={false}>
        <View className='w-full'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='font-black text-lg mb-6'>Filter</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Text className='mb-3 font-bold text-gray-700 text-base'>Location</Text>
            {/* <Location /> */}
          </View>

          <View className='mb-3'>
            <Text className='mb-2 font-bold text-gray-700 text-base'>Best Prices</Text>

            <View className='flex flex-row justify-between items-center'>
                <Input title='Minimum Price' />
                <Input title="Maximum Price " />
            </View>
          </View>

          

          <View>
            <Text className='mb-2 font-bold text-gray-700 text-base'>Discount</Text>

            {discountOptions.map((option) => (
              <Checkbox
                key={option.value}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                text={option.text}
                value={option.value}
              />
            ))}
          </View>

          <View>
            <Text className='mb-2 font-bold text-gray-700 text-base'>Customer Ratings</Text>

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

          <TouchableOpacity className='rounded-full py-2 my-8' style={{backgroundColor: COLORS.light.primary}}>
            <Text className='text-white text-center font-bold'>Apply Filter</Text>
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

const discountOptions = [
  { text: 'Less than 10%', value: 'option1' },
  { text: '10% or more', value: 'option2' },
  { text: '20% or more', value: 'option3' },
  { text: '30% or more', value: 'option4' },
  { text: '40% or more', value: 'option5' },
  { text: '50% or more', value: 'option6' },
];

const customerOptions = [
  { text: 'Less than 1 Star', value: 'option1' },
  { text: '2 Stars', value: 'option2' },
  { text: '3 Stars', value: 'option3' },
  { text: '4 Stars', value: 'option4' },
  { text: '5 Stars', value: 'option5' }
];