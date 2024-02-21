import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';

import Button from '../../components/Buttons/Button'; // Ersetzen Sie dies durch Ihren tatsächlichen Button-Importpfad
import Card from '../../components/Card/Card';
import RecentUsedFilesList from '../../components/FileLists/RecentUsedFilesList';
import FAB from '../../components/Buttons/FloatingActionButton';
import LoadingPopUp from '../../components/LoadingPopUp/ActivityPopUp'; // Ersetzen Sie dies durch Ihren tatsächlichen LoadingPopUp-Importpfad

const HomeScreenNormal = () => {
    const { showActionSheetWithOptions } = useActionSheet();
    const [uploading, setUploading] = useState(false);
    const storage = getStorage(app);

    const uploadFile = async (uri, name) => {
        const storageRef = ref(storage, `uploads/${name}`);
        const response = await fetch(uri);
        const blob = await response.blob();
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);

        try {
            const existingFiles = await AsyncStorage.getItem('recentFiles');
            const parsedFiles = existingFiles ? JSON.parse(existingFiles) : [];
            const updatedFiles = [...parsedFiles, { name, url: downloadURL }];
            await AsyncStorage.setItem('recentFiles', JSON.stringify(updatedFiles));
            console.log('Datei wurde hochgeladen:', { name, url: downloadURL });
        } catch (error) {
            console.error('Fehler beim Speichern der Datei:', error);
        }
    };

    const handleDocumentSelection = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const { uri, name } = result.assets[0];
            setUploading(true);
            await uploadFile(uri, name);
            setUploading(false);
        }
    };

    const handleImageSelection = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Berechtigung erforderlich', 'Wir benötigen Zugriff auf Ihre Fotos, um fortzufahren.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            allowsEditing: false,
            quality: 1,
        });

        try {
            if (!result.canceled && result.assets) {
                setUploading(true);
        
                for (const asset of result.assets) {
                    const { uri, fileName } = asset;
                    await uploadFile(uri, fileName);
                }
        
                setUploading(false);
            }
        } catch (error) {console.error('Fehler beim Hochladen der Datei:', error);}
    };

    const showPickerOptions = () => {
        const options = ['Bild / Video hochladen', 'Datei hochladen', 'Abbrechen'];
        const cancelButtonIndex = 2;
    
        showActionSheetWithOptions({
          options,
          cancelButtonIndex,
          cancelButtonTintColor: '#FF382B',
        }, (selectedIndex: number) => {
          switch (selectedIndex) {
            case 0:
                handleImageSelection();
                break;
            case 1:
                handleDocumentSelection();
                break;
            case cancelButtonIndex:
              // Canceled
              
          }});
      }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.title}>Speicherauslastung</Text>
                    <Card title='Placeholder' description='Placeholder' style={{ marginTop: 30, marginBottom: 16 }} iconName='Storage24Regular' />
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.title}>Zuletzt genutzte Server</Text>
                    <Card title='Prem.AI Cloud Server' description='Firebase Storage' style={{ marginTop: 30, marginBottom: 16 }} iconName='BuildingCloud24Regular' />
                    <Card title='Servername XY' description='192.168.178.1' style={{ marginBottom: 16 }} iconName='Server24Regular' />
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.title}>Zuletzt verwendete Dateien</Text>
                    <RecentUsedFilesList />
                </View>
                {/* Lade-Popup anzeigen, wenn uploading true ist */}
                {uploading && (
                    <LoadingPopUp visible={uploading} />
                )}
            </View>
            <FAB title='Datei hochladen' iconName='ArrowUpload24Regular' onPress={showPickerOptions} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    contentContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionHeader: {
        display: 'flex',
        paddingBottom: 8,
        paddingLeft: 32,
        paddingRight: 32,
        alignItems: 'flex-start',
        flexShrink: 0,
    },
    title: {
        color: '#242424',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 'bold',

    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default HomeScreenNormal;
