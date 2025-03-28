import styles from './ServerLoader.module.css'
import { IProps } from "./types"

export const ServerLoader = ({
    height,
    width,
    borderRadius,
    responsiveMobile
}: IProps) => {
    const style = {
        height,
        width,
        borderRadius,
        ...(responsiveMobile && {
            ['--mobile-height']: responsiveMobile.height,
            ['--mobile-width']: responsiveMobile.width,
        } as any)
    };

    return (
        <div className={styles.skeleton} style={style} />
    )
}

export default ServerLoader;