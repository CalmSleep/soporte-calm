export interface IMailchimpResponse {
    error: boolean
    errorMessage: string,
    response: {
        message: string
    }

}

export interface IMailchimp {
    subscribeStockOut: IMailchimpResponse
    newsletter: IMailchimpResponse
    bigBanner: IMailchimpResponse
    checkoutNews: IMailchimpResponse
    popup: IMailchimpResponse
    klaviyoSuscribers?: boolean
    klaviyoSuscribersError?: boolean
}