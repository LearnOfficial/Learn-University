import Image from "next/image";
import { Text, View } from "react-native";
import LearnLogo from "./assets/LearnLogo.png"

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Image
        src={LearnLogo}
        alt={"Learn Logo"}
        style={{
          width: "50%",
          height: "50%"
        }}
      />
    </View>
  );
}
