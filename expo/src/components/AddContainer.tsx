import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export type AddContainerProps = {
  onPress: () => void
};
export function AddContainer({onPress}: AddContainerProps) {
  return (
    <TouchableOpacity className="border p-3 rounded justify-center items-center" style={{ flex: 1 }}
      onPress={onPress}
    >
      <Feather name="plus" />
    </TouchableOpacity>

  );
}
