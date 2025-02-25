
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { COLORS } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Contact from '@/components/Support/Contact';

const { height } = Dimensions.get('window');

const DisplayTabSupport = ({activeTab, }: {activeTab: string,}) => {
  const {t} = useTranslation();
  const router = useRouter()
  

  switch (activeTab) {
    case "Contact Us":
        return (
            <Contact />
        );

      case "Live Chat Support":
        return (
          <View>
            
          </View>
        );
  
      default:
        return null;
    }
}

export default DisplayTabSupport

const styles = StyleSheet.create({
})