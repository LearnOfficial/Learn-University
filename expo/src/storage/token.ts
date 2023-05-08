import { getItemAsync, setItemAsync } from "expo-secure-store"

const TOKEN_KEY = "token";

async function saveToken(token: string) {
  await setItemAsync(TOKEN_KEY, token);
}

async function readToken(): Promise<string | null> {
  return await getItemAsync(TOKEN_KEY);
}

export { saveToken, readToken }
