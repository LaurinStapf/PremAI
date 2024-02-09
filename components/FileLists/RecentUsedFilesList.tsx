declare module '@fluentui/react-native-icons' {
    interface IconRegistry {
        PDF24Filled: any;
        Photo24Filled: any;
        Document24Filled: any;
        // Fügen Sie hier weitere exportierte Symbole hinzu, falls erforderlich
    }
}

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Icons from '@fluentui/react-native-icons';

const RecentUsedFilesList = () => {
    const [recentFiles, setRecentFiles] = useState([]);
    const containerWidth = useRef(Dimensions.get('window').width);

    useEffect(() => {
        const fetchRecentFiles = async () => {
            try {
                // Abrufen der gespeicherten Download-URLs aus AsyncStorage
                const storedUrls = await AsyncStorage.getItem('recentFiles');
                if (storedUrls) {
                    const urls = JSON.parse(storedUrls);
        
                    // Extrahieren des Dateinamens aus jeder URL in der JSON-Datei
                    const files = urls.map((item, index) => {
                        // Verwenden Sie den Namen aus der JSON-Datei
                        const fileName = item.name;
                        // const fileType = getFileTypeFromName(fileName);
                        return { id: String(index), name: fileName, fileType: fileName.split('.').pop() };
                    });
        
                    // Setzen der Dateien in den Zustand und Umkehren der Reihenfolge
                    setRecentFiles(files.reverse());
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der gespeicherten URLs:', error);
            }
        };

        fetchRecentFiles();
    }, []);

    const renderItem = ({ item }) => {
        const iconName = getFileTypeIconName(item.fileType);
        const IconComponent = Icons[iconName];
        return (
            <View style={styles.itemContainer}>
                <View style={styles.nameContainer}>
                    <IconComponent style={styles.iconStyle}/>
                    <Text style={styles.fileName}>{item.name}</Text>
                </View>
                <View style={[styles.line, { width: containerWidth.current - 45 }]} />
            </View>
        );
    };

    return (
        <FlatList
            data={recentFiles.slice(0, 4)} // Begrenzen auf die ersten 4 Elemente
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        // Stile für die Liste
    },
    itemContainer: {
        flexDirection: 'column',
        marginTop: 13,
        // Weitere Stile wie im Bild gezeigt
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        color:'#808080',
    },
    fileName: {
        marginLeft: 20,
        fontSize: 17,
        color: '#242424',
        // Stile für den Dateinamen
    },
    line: {
        flex: 1,
        height: 0.5,
        backgroundColor: '#E0E0E0',
        marginTop: 13,
        marginLeft: 45,
        // Die Breite wird dynamisch festgelegt
    },
    // Weitere Styles...
});


function getFileTypeIconName(fileType) {
    switch (fileType) {
        case 'docx':
            return 'DocumentText24Regular';
        case 'pdf':
            return 'DocumentPdf24Regular';
        case 'jepg':
        case 'jpg':
        case 'png':
            return 'Image24Regular';
        case 'mp4':
            return 'VideoClip24Regular';
        default:
            return 'Document24Regular'; // Standard-Icon für Dokumente
    }
}


export default RecentUsedFilesList;
