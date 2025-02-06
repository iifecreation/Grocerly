import {SAFE_AREA_PADDING} from '@/utils/utils';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLORS} from '@/theme/colors';
import {useRouter} from 'expo-router';

export default function MainPageHeader({name}: {name: string}) {
  const router = useRouter();
  function goBack() {
    if (router.canGoBack()) {
      router.back();
    }
  }
  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back"
        size={24}
        color={COLORS.white}
        style={{position: 'absolute', left: 10}}
        onPress={goBack}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : -25
  },
  name: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 40,
    textAlign: 'center',
    color: COLORS.white,
  },
});