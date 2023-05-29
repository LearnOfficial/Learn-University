import { Text, TouchableOpacity } from "react-native";
import { COLORS } from "../styles/colors";

type ButtonProps = {
  title: string;
  onPress: any
};
const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Text
      style={{
        textAlign: "center",
        padding: 12,
        borderRadius: 5,
        color: COLORS.imagin[350],
        backgroundColor: COLORS.creativity[350],
        fontFamily: "Lexend",
        fontWeight: "800"
      }}
    >{title}</Text>
  </TouchableOpacity>
);

export default Button;
