import { Container } from "./styled"
import { IProps } from "./types"

export const SkeletonLoader = ({
    height,
    width,
    borderRadius,
    responsiveMobile
    }:  IProps) => {

    return (
    <Container
    $width={width}
    $height={height}
    $responsiveMobile={responsiveMobile}
    $borderRadius={borderRadius}
    />
    )
}

export default SkeletonLoader;