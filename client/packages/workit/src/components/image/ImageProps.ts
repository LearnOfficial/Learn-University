export type  ImageProps = {
  source: {
    require: string & {
      default: {
        src: string
      }
    };
   };
  alt: string;
  width: number;
  height: number;
}
