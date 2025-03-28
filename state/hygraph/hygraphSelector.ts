import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";
import { IHeaderBanner } from "./types";

export const getComponentsData = createSelector((state: IStore) => state.hygraph.componentsData, componentsData => componentsData);

export const getHeadBanner = createSelector((state: IStore, id: string) => [state.hygraph.headBanners, id], data => data && data[0] && data[0].length > 0 && (data[0] as IHeaderBanner[]).find(banner => banner.id == data[1]));

export const getPillsData = createSelector((state: IStore) => state.hygraph.pillsData, data => data);

export const getBannerSidecartData = createSelector((state: IStore) => state.hygraph.bannerSidecart, data => data);

export const getTYCPromotionData = createSelector((state: IStore) => state.hygraph.tycPromotion, data => data);

export const getTYCData = createSelector((state: IStore) => state.hygraph.tyc, data => data);

export const getPopup = createSelector((state: IStore) => state.hygraph.popup, data => data);

export const getBannerAndCucarda = createSelector((state: IStore) => state.hygraph.bannerAndCucarda, data => data);

export const getBigBanners = createSelector((state: IStore) => state.hygraph.bigBanners, data => data);

export const getClearCache = createSelector((state: IStore) => state.hygraph.clearCache, data => data);

export const getRevalidate = createSelector((state: IStore) => state.hygraph.revalidate, data => data);