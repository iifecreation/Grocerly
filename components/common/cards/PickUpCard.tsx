import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PickUpIcon from '@/components/icons/pickUp';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import RoundedIcon from '../Button-icon/Rounded-Icon';

interface PickAddress {
    available: string
    stores: string
    address: string
    distance: string
    station: string,
    itemColor: string,
    background: string,
    iconBackground: string
};

interface PickUpCardProps {
    data: PickAddress;
}

const PickUpCard: React.FC<PickUpCardProps> = ({data}) => {
    
    return (
    <View style={{backgroundColor: data.background}} className='py-5 px-4 rounded-xl mb-4'>
        <View className='flex-row items-center justify-between mb-2'>
            <RoundedIcon color={data.iconBackground}>
                <PickUpIcon />
            </RoundedIcon>

            <View className='flex-row items-center justify-center gap-2'>
                <Fontisto name="flash" size={18} color="#FA8707" />
                <Text className='font-medium'>{data.available}</Text>
            </View>
        </View>

        <Text className='font-bold text-lg mb-3 capitalize'>{data.stores}</Text>

        <View className='flex-row items-center gap-3 mb-3'>
            <RoundedIcon color={data.iconBackground}>
                <EvilIcons name="location" size={24} color={data.itemColor} />
            </RoundedIcon>
            <View >
              <Text className='mb-1 font-medium capitalize'>{data.address}</Text>
              <Text className='text-gray-500'>{data.distance}</Text>
            </View>
        </View>

        <View className='flex-row items-center gap-3'>
            <RoundedIcon color={data.iconBackground}>
                <Ionicons name="call-outline" size={20} color={data.itemColor} />
            </RoundedIcon>
            <Text className='font-medium capitalize'>{data.station}</Text>
      </View>

    </View>
  )
}
export default PickUpCard

const styles = StyleSheet.create({})