// create tsdocs for the following function

/*
 * Lädt die zuletzt verwendeten Dateien aus dem lokalen Speicher
 * @returns {Promise<Array>} - Ein Array mit den zuletzt verwendeten Dateien
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

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
