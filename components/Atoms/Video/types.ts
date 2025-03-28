export type VideoProps = {
    isMp4?: boolean;
    videoUrl: string;
    hasAutoPlay?: boolean;
    hasLoop?: boolean;
    hasMuted?: boolean;
    width?: string
    height?: string
    borderRadius?: string
    title: string
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";

};

export type VideoStyledProps = {
    $width?: string
    $height?: string
    $borderRadius?: string
    $objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";

};