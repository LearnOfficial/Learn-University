import { Dispatch, SetStateAction, useState } from "react";
import { TextInput as TextInputRN } from "react-native";
type TextInputProps = {
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
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
        backgroundColor: onFocus ? "white" : "#E6F3FF",
        borderColor: onFocus ? "#A4D4FF": "#E6F3FF",
        borderWidth: 1
      }}
      onFocus={() => setOnFocus(true)}
      onBlur={() => setOnFocus(false)}
      className="p-2 rounded"
      placeholderTextColor="#3B648A"
      placeholder={placeholder}
      // TODO: remove any
      onChange={onChange as any}
    >
    </TextInputRN>
  );
}
