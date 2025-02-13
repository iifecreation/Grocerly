import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Filter from "@/components/icons/filter"
import {COLORS} from '@/theme/colors';
import { Link } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';

const Header = ({profilePic, location, setModalVisible}: {profilePic?: string, location?: string, setModalVisible: Dispatch<SetStateAction<boolean>>}) => {
    
  return (
    <View className='flex justify-between items-center w-full flex-row px-3' style={{marginTop: -20}}>
       <View className="flex justify-center items-center">
            <Image
                source={{uri: profilePic}}
                className="w-10 h-10 rounded-full object-cover"
            />
        </View>
        <View className='flex flex-row gap-3 justify-center items-center'>
            <SimpleLineIcons name="location-pin" size={24} color={COLORS.white} />
            <Text className='font-bold text-white'>{location}</Text>
        </View>
        <View className='flex flex-row gap-2 items-center'>
            <Link href={APP_ROUTES.SEARCH}>
                <Ionicons name="search" size={24} color={COLORS.white} />
            </Link>
            <Link href={APP_ROUTES.NOTIFICATION}>
                <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            </Link>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Filter />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Header