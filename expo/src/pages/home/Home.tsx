import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { saveToken, readToken } from "../../storage/token";


// TODO: add type to navigation
export default function Home({ navigation }: any) {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    async function checkCurrentUser() {
      const currentToken = await readToken();
      if (currentToken) {
        setToken(currentToken);
      }
    }

    checkCurrentUser();
  }, []);

  // user don't have token
  if (!token) {
    return;
  }

  if(token === ""){
    navigation.navigate("Login");
  }

  return (
    <>
      <Text>Home Page</Text>
      <Button
        title="Logout"
        onPress={async () => {
          navigation.navigate("Login");
          await saveToken("");
        }}
      />
    </>
  )
}
