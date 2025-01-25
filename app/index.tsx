import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';
import Onboarding from '@/components/Onboarding';

export default function index() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Onboarding itemList={[]} />

        <View>
          <TouchableOpacity>
            <Text style={styles.textSkip}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textSkip: {
    color: '#F15A22',
    marginLeft: 300,
    textDecorationLine: 'underline',
  },
});
