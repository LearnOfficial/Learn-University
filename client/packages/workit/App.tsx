import { Image, Platform, Text, View } from "react-native";

export default function App() {
  return (
    <View
      style={{ 
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        resizeMode="center"
        source={require("./assets/LearnLogo.png")}
      />
    </View>
  );
}
