import { Text as TextRN, TextStyle } from "react-native";

type TextProps = {
  children: string;
  weight?: string;
};

export function Text({ children, weight}: TextProps) {
  // TODO: add types of text
  // TODO: remove any
  return (
    <TextRN
      style={{
        fontFamily: "Lexend",
        fontWeight: weight as any || "500"
      }}
    >{children}</TextRN>
  );
}
