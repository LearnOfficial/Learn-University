import { ImageProps } from "./ImageProps";
import { Image as ImageRN, ImageSourcePropType, View } from "react-native"

export default function Image({
  source,
  alt,
  width,
  height
}: ImageProps) {
  return (
    <ImageRN
      style={{
        flex: 1,
        maxWidth: width,
        maxHeight: height
      }}
      resizeMode="stretch"
      source={source.require as ImageSourcePropType}
      alt={alt}
    />
  );
}
