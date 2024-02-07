import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This function gets the user token from the async storage
 * @returns the user token
 *
 * @example
 * const token = await getUserToken();
 * console.log(token);
 *
 */
export const getUserToken = async () => {
  const token = await AsyncStorage.getItem("userToken");
  console.log("token: " + token);
  return token;
};

/**
 * This function saves the user token to the async storage
 * @param token the user token
 *
 * @example
 * await saveToken("userToken");
 *
 */
export const saveToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem("userToken", token);
};

/**
 * This function removes the user token from the async storage
 *
 * @example
 * await removeToken();
 *
 */
export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem("userToken");
};
