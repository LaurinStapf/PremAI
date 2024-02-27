declare module "@fluentui/react-native-icons" {
  interface IconRegistry {
    PDF24Filled: any;
    Photo24Filled: any;
    Document24Filled: any;
    // Fügen Sie hier weitere exportierte Symbole hinzu, falls erforderlich
  }
}

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Icons from "@fluentui/react-native-icons";
import { TouchableRipple } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

type RecentUsedFilesListProps = {
  files: any;
};

const FileList: React.FC<RecentUsedFilesListProps> = ({ files }) => {
  const containerWidth = useRef(Dimensions.get("window").width);

  // make the below to a component ListItem and ad onPress event

  const ListItem = ({ item }) => {
    const iconName = getFileTypeIconName(item.fileType);
    const IconComponent = Icons[iconName];
    const storage = getStorage();

    const downloadFile = async () => {
      const url = await getDownloadURL(ref(storage, `uploads/${item.name}`));
      console.log("Paul" + item.name);
      console.log(url);
      try {
        const downloadInstance = FileSystem.createDownloadResumable(
          url,
          FileSystem.documentDirectory + item.name
        );

        const result = await downloadInstance.downloadAsync();
        const asset = await MediaLibrary.createAssetAsync(result.uri);

        MediaLibrary.createAlbumAsync("Downloads", asset, false)
          .then(() => console.log("File Saved Successfully"))
          .catch(() => console.log("Error in saving file"));
        console.log(result);

        Alert.alert("Download erfolgreich", "Die Datei wurde heruntergeladen.");
      } catch (error: any) {
        console.error(error);
      }
    };

    return (
      <TouchableRipple
      onPress={downloadFile}
      rippleColor="rgba(0, 0, 0, .32)"
      // Stellen Sie sicher, dass die TouchableRipple-Komponente sich über die gesamte Breite erstreckt
      style={[styles.itemContainer, { width: '100%' }]} // Änderung hier, um den Stil anzupassen
    >
      {/* Die Verwendung von Fragment (<></>) wird entfernt, stattdessen direkt eine View als Kind */}
      <View style={{flexDirection: 'column'}}> 
        <View style={styles.nameContainer}>
          <IconComponent style={styles.iconStyle} />
          <Text style={styles.fileName}>{item.name}</Text>
        </View>
        <View style={styles.line} />
      </View>
    </TouchableRipple>
    );
  };

  return (
    <FlatList
      data={files} // Begrenzen auf die ersten 4 Elemente
      renderItem={ListItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      scrollEnabled={false}
      // create an event when clicking on an item
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // Stile für die Liste
  },
  itemContainer: {
    flexDirection: "column",
    // Stile für das Container-Element
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconStyle: {
    marginRight: 10,
    color: "gray",
  },
  fileName: {
    fontSize: 16,
  },
  line: {
    height: 1,
    backgroundColor: "lightgrey",
  },
});

function getFileTypeIconName(fileType) {
  switch (fileType) {
    case "docx":
      return "DocumentText24Regular";
    case "pdf":
      return "DocumentPdf24Regular";
    case "jepg":
    case "jpg":
    case "png":
      return "Image24Regular";
    case "mp4":
      return "VideoClip24Regular";
    default:
      return "Document24Regular"; // Standard-Icon für Dokumente
  }
}

export default FileList;
