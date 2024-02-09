import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WelcomeBottomSheet from './BottomSheets/WelcomeBottomSheet';
import NoIndex from '../../assets/noIndex.svg';
import * as DocumentPicker from 'expo-document-picker';
import Button from '../../components/Buttons/Button';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from '../../firebase/firebaseConfig'; // Stellen Sie sicher, dass Sie Ihre Firebase-Konfiguration importieren

const HomeScreenEmpty = () => {
  const bottomSheetRef = useRef(null);

  const uploadFile = async (uri, name) => {
    const storage = getStorage(app);
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `uploads/${name}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Datei wurde hochgeladen:', snapshot);
    }).catch((error) => {
      console.error('Fehler beim Hochladen der Datei:', error);
    });
  };

  const handleDocumentSelection = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true
    });
  
    // Überprüfen, ob der Benutzer die Auswahl nicht abgebrochen hat
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri, name } = result.assets[0]; // Zugriff auf das erste Element des assets-Arrays
      await uploadFile(uri, name);
    }
  };

  return (
    <View style={styles.container}>
        <NoIndex width={336} height={229}/> 
        <View style={styles.contentContainer}>
            <Text style={styles.infoText}>Sieht so aus, als wäre hier noch nichts los. Konfiguriere deine App und Server</Text>
            <Button title='Datei hochladen' iconName='ArrowUpload24Filled' onPress={handleDocumentSelection} />
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
