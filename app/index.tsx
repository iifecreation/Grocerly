import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {COLORS} from '@/theme/colors';
import {StyleSheet, View} from 'react-native';

import Login from '@/components/section/Login';

export default function index() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* <Onboarding /> */}
        <Login />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
