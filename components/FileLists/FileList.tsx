declare module "@fluentui/react-native-icons" {
    interface IconRegistry {
      PDF24Filled: any;
      Photo24Filled: any;
      Document24Filled: any;
      // Fügen Sie hier weitere exportierte Symbole hinzu, falls erforderlich
    }
  }
  
  import React, { useEffect, useState, useRef } from "react";
  import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
  import { getDownloadURL } from "firebase/storage";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import * as Icons from "@fluentui/react-native-icons";
  
  type RecentUsedFilesListProps = {
    files: any;
  };
  
  const FileList: React.FC<RecentUsedFilesListProps> = ({ files }) => {
    const containerWidth = useRef(Dimensions.get("window").width);  
  
    const renderItem = ({ item }) => {
      const iconName = getFileTypeIconName(item.fileType); // Entfernen Sie die Dateiendung (z. B. "docx" aus "DocumentText24Regular"
      const IconComponent = Icons[iconName];
      return (
        <View style={styles.itemContainer}>
          <View style={styles.nameContainer}>
            <IconComponent style={styles.iconStyle} />
            <Text style={styles.fileName}>{item.name}</Text>
          </View>
          <View style={[styles.line, { width: containerWidth.current - 45 }]} />
        </View>
      );
    };
  
    return (
      <FlatList
        data={files} // Begrenzen auf die ersten 4 Elemente
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
      flexDirection: "column",
      marginTop: 13,
      // Weitere Stile wie im Bild gezeigt
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconStyle: {
      color: "#808080",
    },
    fileName: {
      marginLeft: 20,
      fontSize: 17,
      color: "#242424",
      // Stile für den Dateinamen
    },
    line: {
      flex: 1,
      height: 0.5,
      backgroundColor: "#E0E0E0",
      marginTop: 13,
      marginLeft: 45,
      // Die Breite wird dynamisch festgelegt
    },
    // Weitere Styles...
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