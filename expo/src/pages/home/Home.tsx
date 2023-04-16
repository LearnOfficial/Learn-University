import { Button, Text } from "react-native";
export default function Home({navigation}) {
  return (
    <>
      <Text>Home Page</Text>
      <Button 
        title="Logout"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </>
  )
}
