import { Text, TouchableOpacity } from "react-native";

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
        color: "#FAFAFA",
        backgroundColor: "#0C151C",
        fontFamily: "Lexend",
        fontWeight: "800"
      }}
    >{title}</Text>
  </TouchableOpacity>
);

export default Button;
