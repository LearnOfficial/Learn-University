import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = "token";

async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

async function readToken(): Promise<string | null> {
  return await AsyncStorage.getItem(TOKEN_KEY);
}


export { readToken, saveToken }
