import {
  RotatingDiv,
  SpinnerContainer,
  SpinnerCenterContainer,
  SpinnerCenter,
  SpinnerOverlay
} from "./styled"
import { IProps } from "./types"

const Spinner = ({ isBlack, isCenterScreen, hasOverlay, containerHeight, height, width }: IProps) => {
  return (
    <>
      {isCenterScreen ? (
        <SpinnerCenterContainer $isCenterScreen={isCenterScreen} $containerHeight={containerHeight}>
          <SpinnerCenter $isBlack={isBlack} $height={height} $width={width}/>
        </SpinnerCenterContainer>
      ) : hasOverlay ? (
        <SpinnerOverlay>
          <RotatingDiv $isBlack={isBlack} $hasOverlay={hasOverlay} />
        </SpinnerOverlay>
      ) : (
        <SpinnerContainer>
          <SpinnerCenter $isBlack={isBlack} $height={height} $width={width}/>
        </SpinnerContainer>
      )}
    </>
  )
}

export default Spinner
