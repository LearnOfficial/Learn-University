import { useContext, useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { saveToken, readToken } from "../../storage/token";
import { TokenContext } from "../../storage/TokenContext";


// TODO: add type to navigation
export default function Home({ navigation }: any) {
  const token = useContext(TokenContext);

  if(token === ""){
    return navigation.navigate("Login");
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
