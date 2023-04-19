import { SafeAreaView, Text } from "react-native";
import { IMAGES } from "./assets";
import Image from "./components/image/Image";

export default function App() {
  const LogoWidth = 300;
  const LogoRatio = 16/8;
  const LogoHeight = LogoWidth/LogoRatio;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={IMAGES["LearnLogo"]}
        alt="Learn Icon"
        width={LogoWidth}
        height={LogoHeight}
      />
    </SafeAreaView>
  );
}
