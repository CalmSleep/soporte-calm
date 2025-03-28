import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";

export const getNewsLetterResponse = createSelector((state: IStore) => state.mailchimp, mailchimp => mailchimp.newsletter)

export const getSubscribeStockoutResponse = createSelector((state: IStore) => state.mailchimp, mailchimp => mailchimp.subscribeStockOut)

export const getBigBannerResponse = createSelector((state: IStore) => state.mailchimp, mailchimp => mailchimp.bigBanner)

export const getPopupResponse = createSelector((state: IStore) => state.mailchimp, mailchimp => mailchimp.popup)

export const getCheckoutNewsResponse = createSelector((state: IStore) => state.mailchimp, mailchimp => mailchimp.checkoutNews)
 
export const getKlaviyoSuscribersResponse = createSelector((state: IStore) => state.mailchimp, mailchimp => mailchimp.klaviyoSuscribers)

export const getKlaviyoSuscribersError = createSelector((state: IStore) => state.mailchimp, mailchimp => mailchimp.klaviyoSuscribersError)