import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/theme/colors'
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Bag from '@/components/icons/bag';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';
import commonStyles from '../styles/common';
import ModalComponent from '../common/Modal/Modal';

interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartPopup: React.FC<ModalComponentProps> = ({modalVisible, setModalVisible}) => {

  const router = useRouter()
  return (
    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} yourHeight={0.5}>
      <View className='justify-center items-center'>
      <View className='mb-7 mt-5'>
            <Bag />
            <Text className='font-medium text-base mt-4'>Item added to cart!</Text>
      </View>

      <View className='mb-20 flex flex-row justify-between items-center w-full'>
        <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3' style={{backgroundColor: COLORS.light.primary, width: "45%"}} onPress={() => {
          router.navigate(APP_ROUTES.HOME)
          setModalVisible(false)}}>
            <Octicons
            name="home"
            size={24}
            color="#fff"
            />
          <Text className='text-white font-bold capitalize'>home</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex flex-row items-center gap-3 rounded-full justify-center py-3 border' style={{width: "45%", borderColor: COLORS.light.primary}} onPress={() => {
          router.navigate(APP_ROUTES.CART)
          setModalVisible(false)}}>
            <Ionicons
            name="cart-outline"
            size={24}
            color="#F15A22"
          />
          <Text className='text-gray-500 font-bold capitalize' style={commonStyles.color}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ModalComponent>
  )
}

export default CartPopup

const styles = StyleSheet.create({})