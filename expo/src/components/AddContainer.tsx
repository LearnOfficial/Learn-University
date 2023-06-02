import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export type AddContainerProps = {
  onPress: () => void
};
export function AddContainer(props:any) {
  return (
    <TouchableOpacity className="border p-3 rounded justify-center items-center" style={{ flex: 1 }}
      onPress={props.onPress}
    >
      <Text>{props.text}</Text>
    </TouchableOpacity>

  );
}
