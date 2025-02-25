import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { COLORS } from '@/theme/colors'
import ArchBorder from '@/components/ArchBorder'
import MainPageHeader from '@/components/MainPageHeader'
import { useTranslation } from 'react-i18next'
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Terms from "@/components/icons/terms"
import { SAFE_AREA_PADDING } from '@/utils/utils'
import GreaterThan from "@/components/icons/greaterThan"
import { APP_ROUTES } from '@/contants/app-routes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router'
import useAuthToken from '@/hooks/useAuthToken'


const Account = () => {
  const {t} = useTranslation();
  const listRef = useRef(null);
  const router = useRouter()
  const {logOut} = useAuthToken();

  const listSection = [
    {
      id: 1,
      name: t("account.list_section.1"),
      icon: <Ionicons name="person-outline" size={20} color="#00000066" />,
      routes: APP_ROUTES.PERSONAL_DETAILS
    },
    {
      id: 2,
      name: t("account.list_section.2"),
      icon: <Ionicons name="location-outline" size={20} color="#00000066" />,
      routes: APP_ROUTES.ADDRESS
    },
    {
      id: 3,
      name: t("account.list_section.3"),
      icon: <Ionicons name="settings-outline" size={20} color="#00000066" />,
      routes: APP_ROUTES.PASSWORD_SETTING
    },
    {
      id: 4,
      name: t("account.list_section.4"),
      icon: <Terms />,
      routes: APP_ROUTES.TERMS
    },
    {
      id: 5,
      name: t("account.list_section.5"),
      icon: <Octicons name="question" size={20} color="#00000066" />,
      routes: APP_ROUTES.SUPPORT
    },
    {
      id: 6,
      name: t("account.list_section.6"),
      icon: <Octicons name="shield" size={20} color="#00000066" />,
      routes: APP_ROUTES.PRIVACY
    }
  ]

  return (
    <ScreenWrapper background={COLORS.light.primary}>
      <View className="flex-1 bg-white">
        <ArchBorder>
          <MainPageHeader name={t("account.title")} />
        </ArchBorder>

        <View style={styles.headerDesc}>
          <FlatList
            ref={listRef}
            data={listSection}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{rowGap: 20}}
            style={{marginBottom: 20}}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item: any)=> (
              <View className='flex-row items-center justify-between w-full border-b-2 pb-2 border-gray-50'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-full items-center justify-center w-[35] h-[35] bg-gray-200'>
                    {item?.item?.icon}
                  </View>
                  <Text className='font-medium text-base capitalize'>{item?.item?.name}</Text>
                </View>

                <TouchableOpacity className='' onPress={() => router.push(item?.item?.routes) }>
                  <GreaterThan />
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity className='flex-row items-center gap-3' onPress={() => logOut()}>
            <View className='rounded-full items-center justify-center w-[40] h-[40]' style={{backgroundColor: "#E00000"}}>
              <MaterialIcons name="logout" size={20} color="#ffffff" />
            </View>
            <Text className='font-medium text-base capitalize' style={{color: "#E00000"}}>{t("account.list_section.7")}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Account

const styles = StyleSheet.create({
  headerDesc: {
    position: "absolute",
    top: 150,
    zIndex: 10,
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  }
});