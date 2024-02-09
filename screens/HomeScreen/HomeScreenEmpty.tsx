import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WelcomeBottomSheet from './WelcomeBottomSheet';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import NoIndex from '../../assets/noIndex.svg';

const HomeScreenEmpty = () => {

  // create ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View style={styles.container}>
        <NoIndex width={336} height={229}/> 
        <View style={styles.contentContainer}>
            <Text style={styles.infoText}>Sieht so aus, als wäre hier noch nichts los. Konfiguriere deine App und Server</Text>
        </View> 
        <WelcomeBottomSheet ref={bottomSheetRef} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    color: '#CCCCCC',
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
});

export default HomeScreenEmpty;
