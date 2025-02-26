
import { Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Contact from '@/components/Support/Contact';
import LiveChat from '@/components/Support/LiveChat';

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
          <LiveChat />
        );
  
      default:
        return null;
    }
}

export default DisplayTabSupport

const styles = StyleSheet.create({
})