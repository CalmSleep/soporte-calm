import { theme } from "@/utils/Theme";
import { Id, toast, ToastPosition,  } from "react-toastify"
import { CSSProperties } from "react";

interface IToast {
    msg: string,
    position?: ToastPosition | undefined,
    autoClose?: number | false | undefined,
    toastId?: Id | undefined,
    icon?: any,
    pauseOnFocusLoss?: boolean | undefined,
    style?: CSSProperties | undefined,
}

const style_default = {
    backgroundColor: "#8f4f9a",
    color: "white",
    borderRadius: "0.5rem",
    width: "500px",
    fontFamily: "Gilroy-Bold",
    fontWeight: "700",
    fontSize: "1.2rem",
    letterSpacing: "1px",
    lineHeight: "21px",
}

export const toastInfo = (msg: string) => {
    toast.info(msg, {
        position: "bottom-center",
        autoClose: 5000,
        toastId: "",
        icon: false,
        pauseOnFocusLoss: false,
        style: {
            backgroundColor: "#631F99",
            color: "white",
            borderRadius: "0.5rem",
            width: "500px",
            fontFamily: `${theme.fonts.bold}`,
            fontWeight: "700",
            fontSize: "1.2rem",
            letterSpacing: "1px",
            lineHeight: "21px",
        },
    })
}

export const toastError = (msg: string, width: string) => {
    toast.error(msg, {
        position: "bottom-center",
        autoClose: 5000,
        toastId: "",
        icon: false,
        pauseOnFocusLoss: false,
        style: {
            backgroundColor: "#631F99",
            color: "white",
            borderRadius: "0.5rem",
            width: width,
            fontFamily: `${theme.fonts.bold}`,
            fontWeight: "700",
            fontSize: "1.2rem",
            letterSpacing: "1px",
            lineHeight: "21px",
        },
    })
}

export const toast_error = ({
    msg, 
    position = "bottom-center", 
    autoClose = 5000, 
    toastId = "", 
    icon = false, 
    pauseOnFocusLoss = true, 
    style = style_default
}: IToast): void => {
    toast.error(msg, {
        position,
        autoClose,
        toastId,
        icon,
        pauseOnFocusLoss,
        style
    })
}

export const toast_success = ({
    msg, 
    position = "bottom-center", 
    autoClose = 5000, 
    toastId = "", 
    icon = false, 
    pauseOnFocusLoss = true, 
    style = style_default
}: IToast): void => {
    toast.success(msg, {
        position,
        autoClose,
        toastId,
        icon,
        pauseOnFocusLoss,
        style
    })
}

export const toast_warning = ({
    msg, 
    position = "bottom-center", 
    autoClose = 5000, 
    toastId = "", 
    icon = false, 
    pauseOnFocusLoss = true, 
    style = style_default
}: IToast): void => {
    toast.warning(msg, {
        position,
        autoClose,
        toastId,
        icon,
        pauseOnFocusLoss,
        style
    })
}