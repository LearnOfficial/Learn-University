import { Text, TouchableOpacity } from "react-native";
import { COLORS } from "../styles/colors";

type ButtonProps = {
  title: string;
  onPress: any
};
const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity
    className="flex"
    onPress={onPress}
  >
    <Text
      className="flex rounded p-3"
      style={{
        color: COLORS.imagin[350],
        backgroundColor: COLORS.creativity[350],
        fontFamily: "Lexend",
        fontWeight: "800"
      }}
    >{title}</Text>
  </TouchableOpacity>
);

export default Button;
