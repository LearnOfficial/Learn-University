import { Text, View } from "react-native";
import { COLORS } from "../styles/colors";

export type SepartorProps = {
  title: string;
  color: string;
};

const Line = ({color}: {color: string}) => {
  return (
    <View style={{
      flex: 1,
      flexGrow: 1,
      backgroundColor: color,
      height: 2
    }} />
  );
}

export function Separator({ title, color}: SepartorProps) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Line color={color}/>
      <Text
        style={{
          color: color,
        }}
      >{title}</Text>
      <Line color={color}/>

    </View>
  );
}
