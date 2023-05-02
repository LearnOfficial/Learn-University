import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  onPress: any
};
const Button = ({ title, onPress }:ButtonProps) => (
  <TouchableOpacity
    className="flex justify-center items-center h-10 p-3 m-1 rounded bg-slate-900"
    onPress={onPress}
  >
    <Text className="text-slate-50 p-6 font-bold">{title}</Text>
  </TouchableOpacity>
);

export default Button;