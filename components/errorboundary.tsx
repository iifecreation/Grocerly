import React from 'react';
import { View, Text } from 'react-native';
import { type ErrorBoundaryProps } from 'expo-router';

// use error boundary on components with api request are made
export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Go Home</Text>
    </View>
  );
}
