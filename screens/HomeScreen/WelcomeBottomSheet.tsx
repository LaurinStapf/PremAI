import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Welcome from '../../assets/welcome.svg';
import Button from '../../components/Button';

// create interface for props
interface WelcomeBottomSheetProps {
  children ?: React.ReactNode;
  onRequestClose ?: () => void; 
  ref: React.RefObject<BottomSheet>;
}


const WelcomeBottomSheet = forwardRef<BottomSheet, WelcomeBottomSheetProps>(
  ({onRequestClose, ...props}, ref) => {
  const bottomSheetRef = useRef(null);

  // Zustand hinzufügen, um den Index des BottomSheet zu verfolgen
  const [sheetIndex, setSheetIndex] = useState(1); // Startet mit 1, was dem zweiten snapPoint entspricht

  const snapPoints = useMemo(() => ['45%', '45%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    setSheetIndex(index); // Aktualisieren Sie den Zustand, um den aktuellen Index zu verfolgen
  }, []);

  const closeBottomSheet = () => {
    // Verwende die Ref, um das Bottom Sheet zu schließen
    bottomSheetRef.current?.close();
  };

  const handleLearnApp = () => {
     // Optional: Schließe das Bottom Sheet
     closeBottomSheet();
  };

  return (
      <BottomSheet
        ref={ref}
        index={sheetIndex}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={BottomSheetBackdrop}
        {...props}
        backgroundComponent={({style}) =>( 
          <View style={[style, styles.container]}></View>
        )}>
          <Text style={styles.sheetTitle}>Prem.AI - Start</Text>
          <Welcome width={208} height={90} style={{ alignSelf: 'center', marginBottom: 20 }} />
          <Text style={styles.title}>Herzlich Willkommen</Text>
          <Text style={styles.description}>Erlebe neue Möglichkeiten im Bereich Data Management</Text>
          <View style={styles.buttonContainer}>
            <Button title="App kennenlernen" onPress={handleLearnApp} />
            <Button design="secondary" title="Tutorial überspringen" onPress={() => closeBottomSheet()} />
          </View>
      </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: -2,
    borderRadius: 12,
  },
  contentContainer: {
    alignItems: 'center',
  },
  sheetTitle: {
    color: '#242424',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  title: {
    color: '#242424',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  description: {
    color: '#242424',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    paddingBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 8,
    width: '100%',
  }
});

export default WelcomeBottomSheet;
