import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';
import ArchBorder from '@/components/ArchBorder';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import Header from '@/components/home/header';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import { useTranslation } from 'react-i18next';
import Filter from '@/components/Filter/Filter';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const search = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const {t} = useTranslation();
    
  return (
    <ScreenWrapper background={COLORS.light.primary}>
        <ArchBorder>
            <Header location='Ipoh, Malaysia' profilePic='https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg' setModalVisible={setModalVisible} />
        </ArchBorder>
        <View style={styles.headerDesc}>
            {/* <Text className='text-center'>{t('search.placeholder')}</Text> */}
            <View className='flex flex-row items-center border border-gray-300 w-full rounded-full p-2 gap-4'>
                <EvilIcons name="search" size={24} color="black" />
                <TextInput placeholder={t('search.placeholder')} className='w-full' />
            </View>
        </View>

        <Filter modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ScreenWrapper>
  );
};

export default search;

const styles = StyleSheet.create({
  headerDesc: {
    position: "absolute",
    top: 150,
    zIndex: 10,
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    width: "100%"
  }
});