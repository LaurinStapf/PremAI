// create tsdocs for the following function

/*
 * Lädt die zuletzt verwendeten Dateien aus dem lokalen Speicher
 * @returns {Promise<Array>} - Ein Array mit den zuletzt verwendeten Dateien
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const loadRecentFiles = async () => {
  try {
    const storedUrls = await AsyncStorage.getItem("recentFiles");
    if (storedUrls) {
      const urls = JSON.parse(storedUrls);
      return urls;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der gespeicherten URLs:", error);
  }
};
// create a function getFilesFromFirebaseStorage to get files from firebase storage from "uploads"

// create TSdocs for the following function
/*
 * Lädt die Dateien aus dem Firebase Storage
 * @param {Object} storage - Das Firebase Storage-Objekt
 * @returns {Promise<Array>} - Ein Array mit den Dateien aus dem Firebase Storage
 */
export const getFilesFromFirebaseStorage = async (storage) => {
  const storageRef = ref(storage, "uploads");
  const listRef = await listAll(storageRef);
  const files = [];
  for (const item of listRef.items) {
    const url = await getDownloadURL(item);
    files.push({ name: item.name, url, fileType: item.name.split(".").pop()});
  }
  return files;
};
// create a function uploadFile to upload files to firebase storage
