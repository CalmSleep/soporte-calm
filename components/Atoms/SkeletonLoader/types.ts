export interface IProps {
    height: string,
    width: string
    borderRadius?: string
    responsiveMobile?: responsiveMobile;
}

export interface IPropsStyles {
    $height: string,
    $width: string
    $borderRadius?: string
    $responsiveMobile?: responsiveMobile;
}

type responsiveMobile = {
    height?: string;
    width?: string
  }