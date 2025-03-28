import { PositionerProps } from "./types"
import { Center } from "./styled"

const Positioner = ({
    children,
    position
  }: PositionerProps) => {
    return (
        <>
        {
            position == "center" ?
            <Center>{children}</Center>
            : <></>
        }
        </>
    )
}

export default Positioner;