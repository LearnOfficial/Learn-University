import ImageNext from "next/image";
import { ImageProps } from "./ImageProps";

export default function Image({
  source,
  alt,
  width,
  height
}: ImageProps) {
  const staticImgPath = source.require?.default?.src;
  return (
    <ImageNext
      src={staticImgPath}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
