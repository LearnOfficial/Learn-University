import { Dispatch, SetStateAction, useState } from "react";
import { TextInput as TextInputRN } from "react-native";
import { COLORS } from "../styles/colors";
type TextInputProps = {
  placeholder: string;
  onChange: (e: any) => void;
}
export function TextInput({
  placeholder,
  onChange
}: TextInputProps) {
  const [onFocus, setOnFocus] = useState<boolean>(false);

  return (
    <TextInputRN
      style={{
        fontFamily: 'Lexend',
        fontWeight: "500",
        backgroundColor: onFocus ? COLORS.imagin[350] : COLORS.creativity[120],
        borderColor: onFocus ? COLORS.creativity[350]: COLORS.creativity[120],
        color: COLORS.curiosity[350],
        borderWidth: 1
      }}
      onFocus={() => setOnFocus(true)}
      onBlur={() => setOnFocus(false)}
      className="p-2 rounded"
      placeholderTextColor={COLORS.creativity[380]}
      placeholder={placeholder}
      // TODO: remove any
      onChangeText={onChange as any}
    >
    </TextInputRN>
  );
}
