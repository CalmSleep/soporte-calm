export interface ILoggedUser {
    userStatus?: {
        status: number,
        data: boolean,
    }
    openCheckoutChat?: boolean,
    error: boolean
    cp?: string
    abTesting?: boolean
    b2bSendData?: boolean
    hideNavbar?: boolean
    abandonedPopupClicked?: boolean
    chatNavigation: boolean
    chatLoaded?: boolean
}

export interface IKlaviyoEventBodyParams {
    type: "event",
        attributes: {
        metric: {
            data: {
                type: "metric",
                attributes: {
                    name: "Started Checkout"
                }
            }
        },
        profile: {
            data: {
                type: "profile",
                attributes: {
                    email: string
                }
            }
        },
        properties: {
            $value?: string,
            ItemNames: string[],
            CheckoutURL: string,
            Items: {
                ProductID: number,
                SKU: string,
                ProductName: string,
                Quantity: number,
                ItemPrice?: string,
                ImageURL: string
            }[]
        },
        time: string //2024-02-17T12:00:00Z
    }
}