import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import i18n from './i18n';

export default function App() {
  const aa = '';
  return (
    <I18nextProvider i18n={i18n}>
      <View style={styles.container}>
        <Text>Welcome to my App</Text>
        <StatusBar style="auto" />
      </View>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
