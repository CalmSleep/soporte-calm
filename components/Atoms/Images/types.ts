type responsiveMobile = {
  width?: string;
  height?: string;
  align?: string;
  borderRadius?: string;
  margin?: string;
  display?: string;
};

export type ImagesProps = {
  children?: React.ReactNode;
  sizes?: string;
  src: string;
  alt: string;
  width?: string;
  height?: string;
  widthLCP?: number;
  heightLCP?: number;
  widthHTML?: number;
  fetchpriority?: boolean;
  aspectRatio?: number;
  layout?: string;
  heightHTML?: number;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  hasTransition?: boolean;
  responsiveMobile?: responsiveMobile;
  borderRadius?: string;
  isLazy?: boolean;
  priority?: boolean;
  title?: string;
  placeholder?: "blur";
  blurDataURL?: string;
  fill?: boolean;
  unoptimized?: boolean;
  opacity?: string;
};

export type ImageStyledProps = {
  $width?: string;
  $height?: string;
  $aspectRatio?: number;
  $objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  $transition?: string;
  $transform?: string;
  $responsiveMobile?: responsiveMobile;
  $borderRadius?: string;
  $opacity?: string;
};
