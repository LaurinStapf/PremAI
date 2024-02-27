import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import FileList from "../../components/FileLists/FileList";
import { getFilesFromFirebaseStorage } from "../HomeScreen/utils/fileHandler";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";

import AsyncStorage from "@react-native-async-storage/async-storage";
// Components
import FAB from "../../components/Buttons/FloatingActionButton";

interface FilesScreenProps {
  // Hier können die Props für den Screen definiert werden
}

const FilesScreen: React.FC<FilesScreenProps> = () => {
  // create a state variable for files
  const { showActionSheetWithOptions } = useActionSheet();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const storage = getStorage();

  const uploadFile = async (uri, name, storage) => {
    const storageRef = ref(storage, `uploads/${name}`);
    const response = await fetch(uri);
    const blob = await response.blob();

    // Erstelle einen Upload-Task
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Registriere drei Observer: 'state_changed', 'success' und 'error'
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Überwache den Fortschritt des Uploads
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload ist " + progress + "% fertig");
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        // Behandle mögliche Fehler
        console.error("Fehler beim Upload:", error);
      },
      () => {
        // Upload erfolgreich abgeschlossen
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const existingFiles = await AsyncStorage.getItem("recentFiles");
            const parsedFiles = existingFiles ? JSON.parse(existingFiles) : [];
            const updatedFiles = [...parsedFiles, { name, url: downloadURL }];
            await AsyncStorage.setItem(
              "recentFiles",
              JSON.stringify(updatedFiles)
            );
            console.log("Datei wurde hochgeladen:", { name, url: downloadURL });
            setTimeout(() => {
              setUploading(false);
            }, 1000);
          } catch (error) {
            console.error(
              "Fehler beim Speichern der Dateiinformationen:",
              error
            );
          }
        });
      }
    );

    // set recent files to pass state to the RecentUsedFilesList component
    setFiles([...files, { name, url: uploadTask.snapshot.ref }]);
  };

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Berechtigung erforderlich",
        "Wir benötigen Zugriff auf Ihre Fotos, um fortzufahren."
      );
      return;
    }



    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 0,
    });

    try {
      if (!result.canceled && result.assets) {
        setUploading(true);

        for (const asset of result.assets) {
          const { uri, fileName } = asset;
          await uploadFile(uri, fileName, storage);
        }
      }
    } catch (error) {
      console.error("Fehler beim Hochladen der Datei:", error);
    }
  };
  const handleDocumentSelection = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri, name } = result.assets[0];
      setUploading(true);
      // Rufe die angepasste uploadFile-Methode auf und übergebe das storage-Objekt
      await uploadFile(uri, name, storage);
    }
  };

  const showPickerOptions = () => {
    const options = ["Upload media", "Upload files", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor: "#FF382B",
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 0:
            handleImageSelection();
            break;
          case 1:
            handleDocumentSelection();
            break;
          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  useEffect(() => {
    getFilesFromFirebaseStorage(storage).then((files) => {
      setFiles(files);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dateien</Text>
      <ScrollView>
        <FileList files={[...files]} />
       
      </ScrollView>
      <FAB
        title="Datei hochladen"
        iconName="ArrowUpload24Regular"
        onPress={() => showPickerOptions()}
        // make it stay on top
        style={{ position: "absolute", margin: 0.5, right: -16, bottom:-0.3 }}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  title: {
    color: "#242424",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "bold",
  },
});

export default FilesScreen;
