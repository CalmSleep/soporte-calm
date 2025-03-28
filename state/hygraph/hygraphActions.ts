import { ON_GET_HEAD_BANNERS_HYGRAPH_DATA_FAILED,
    ON_GET_HEAD_BANNERS_HYGRAPH_DATA_SUCCEEDED,
    ON_GET_PILLS_HYGRAPH_DATA_FAILED,
    ON_GET_PILLS_HYGRAPH_DATA_SUCCEEDED,
    ON_GET_SIDECART_HYGRAPH_DATA_FAILED,
    ON_GET_SIDECART_HYGRAPH_DATA_SUCCEEDED,
    ON_GET_TYC_HYGRAPH_DATA_FAILED,
    ON_GET_TYC_HYGRAPH_DATA_SUCCEEDED,
    ON_GET_TYC_PROMO_HYGRAPH_DATA_FAILED,
    ON_GET_TYC_PROMO_HYGRAPH_DATA_SUCCEEDED,
    ON_SAVE_HYGRAPH_COMPONENT,
    ON_GET_POPUP_SUCCEEDED,
    ON_GET_POPUP_FAILED,
    ON_GET_BANNER_AND_CUCARDA_SUCCEEDED,
    ON_GET_BANNER_AND_CUCARDA__FAILED,
    ON_GET_BIG_BANNERS_SUCCEEDED,
    ON_GET_BIG_BANNERS_FAILED,
    ON_GET_CLEAR_CACHE_SUCCEEDED,
    ON_GET_CLEAR_CACHE_FAILED,
    ON_GET_REVALIDATE_SUCCEEDED,
    ON_GET_REVALIDATE_FAILED
} from "./hygraphConstants";
import { getRevalidate, getBigBannersData, getClearCache, getHeadBannersData, getPillsData, getSidecartData, getTYCContentData, getTYCPromoContentData, getPopup, getBannerAndCucarda, getBannerAndCucardaFijos } from "./hygraphServices";
import { IComponentData } from "./types";
import { onRedirectLoadingStart, onRedirectLoadingFinished} from "@/state/loading/loadingActions"

export const onGetHygraphClearCache = (urls: string[]) => {
    return async (dispatch: any) => {
        dispatch(onRedirectLoadingStart())
        const response = await getClearCache(urls);

        if (response) {
            dispatch(onGetClearCacheSucceeded(response))
            dispatch(onRedirectLoadingFinished())
        } else {
            dispatch(onGetClearCacheDataFailed())
            dispatch(onRedirectLoadingFinished())
        }
    };
};

const onGetClearCacheSucceeded = (data: any) => ({
    type: ON_GET_CLEAR_CACHE_SUCCEEDED,
    data
});
  
const onGetClearCacheDataFailed = () => ({
    type: ON_GET_CLEAR_CACHE_FAILED
});

export const onGetRevalidate = (path: string) => {
    return async (dispatch: any) => {
        dispatch(onRedirectLoadingStart())
        const response = await getRevalidate(path);

        if (response) {
            dispatch(onGetRevalidateSucceeded(response))
            dispatch(onRedirectLoadingFinished())
        } else {
            dispatch(onGetRevalidateDataFailed())
            dispatch(onRedirectLoadingFinished())
        }
    };
};

const onGetRevalidateSucceeded = (data: any) => ({
    type: ON_GET_REVALIDATE_SUCCEEDED,
    data
});
  
const onGetRevalidateDataFailed = () => ({
    type: ON_GET_REVALIDATE_FAILED
});

export const onSaveComponent = (componentData: IComponentData) => ({
    type: ON_SAVE_HYGRAPH_COMPONENT,
    componentData
});

export const onGetBigBanners = () => {
    return async (dispatch: any) => {
        const response = await getBigBannersData();

        if (response && response.data && response.data.bigBanners) {
            dispatch(onGetBigBannersSucceeded(response.data.bigBanners))
        } else {
            dispatch(onGetBigBannersFailed())
        }
    };
};

const onGetBigBannersSucceeded = (data: any) => ({
    type: ON_GET_BIG_BANNERS_SUCCEEDED,
    data
});

const onGetBigBannersFailed = () => ({
    type: ON_GET_BIG_BANNERS_FAILED
});

export const onGetHeadBannersData = () => {
    return async (dispatch: any) => {
        const response = await getHeadBannersData();
        if (response && response.data && response.data.headBanners) {
            dispatch(onGetHeadBannersDataSucceeded(response.data.headBanners))
        } else {
            dispatch(onGetHeadBannersDataFailed())
        }
    };
};

export const onGetHeadBannersDataSucceeded = (data: any) => ({
    type: ON_GET_HEAD_BANNERS_HYGRAPH_DATA_SUCCEEDED,
    data
});
  
const onGetHeadBannersDataFailed = () => ({
    type: ON_GET_HEAD_BANNERS_HYGRAPH_DATA_FAILED
});

export const onGetPillsData = () => {
    return async (dispatch: any) => {
        const response = await getPillsData();
        if (response && response.data && response.data.pillOfferProducts && response.data.pillOfferProducts) {
            dispatch(onGetPillsDataSucceeded(response.data.pillOfferProducts))
        } else {
            dispatch(onGetPillsDataFailed())
        }
    };
};

export const onGetPillsDataSucceeded = (data: any) => ({
    type: ON_GET_PILLS_HYGRAPH_DATA_SUCCEEDED,
    data
});

const onGetPillsDataFailed = () => ({
    type: ON_GET_PILLS_HYGRAPH_DATA_FAILED
});

export const onGetBannerSidecartData = () => {
    return async (dispatch: any) => {
        const response = await getSidecartData();
        if (response && response.data && response.data.bannerSidecart) {
            dispatch(onGetBannerSidecartDataSucceeded(response.data.bannerSidecart))
        } else {
            dispatch(onGetBannerSidecartDataFailed())
        }
    };
};

const onGetBannerSidecartDataSucceeded = (data: any) => ({
    type: ON_GET_SIDECART_HYGRAPH_DATA_SUCCEEDED,
    data
});

const onGetBannerSidecartDataFailed = () => ({
    type: ON_GET_SIDECART_HYGRAPH_DATA_FAILED
});

export const onGetTyCPromotionData = () => {
    const queryName = process.env.NEXT_PUBLIC_HYPERGRAPH_USER == "it" ? "tyCPromotion" : "tycPromotion"

    return async (dispatch: any) => {
        const response = await getTYCPromoContentData();
        
        if (response && response.data && response.data[queryName]) {
            dispatch(onGetTyCPromotionDataSucceeded(response.data[queryName]))
        } else {
            dispatch(onGetTyCPromotionDataFailed())
        }
    };
};

const onGetTyCPromotionDataSucceeded = (data: any) => ({
    type: ON_GET_TYC_PROMO_HYGRAPH_DATA_SUCCEEDED,
    data
});

const onGetTyCPromotionDataFailed = () => ({
    type: ON_GET_TYC_PROMO_HYGRAPH_DATA_FAILED
});

export const onGetTyCData = () => {
    return async (dispatch: any) => {
        const response = await getTYCContentData();
        if (response && response.data && response.data.termsAndConditions) {
            dispatch(onGetTyCDataSucceeded(response.data.termsAndConditions))
        } else {
            dispatch(onGetTyCDataFailed())
        }
    };
};

const onGetTyCDataSucceeded = (data: any) => ({
    type: ON_GET_TYC_HYGRAPH_DATA_SUCCEEDED,
    data
});

const onGetTyCDataFailed = () => ({
    type: ON_GET_TYC_HYGRAPH_DATA_FAILED
});

export const onGetPopup = () => {
    return async (dispatch: any) => {
        const response = await getPopup();
        if (response && response.data && response.data.popup) {
            dispatch(onGetPopupSucceeded(response.data.popup))
        } else {
            dispatch(onGetPopupFailed())
        }
    };
};

const onGetPopupSucceeded = (data: any) => ({
    type: ON_GET_POPUP_SUCCEEDED,
    data
});

const onGetPopupFailed = () => ({
    type: ON_GET_POPUP_FAILED
});

export const onGetBannerAndCucarda = () => {
    return async (dispatch: any) => {
        const response = await getBannerAndCucarda();
        const responseFijos = await getBannerAndCucardaFijos();


        if (
            response && 
            response.data && 
            response.data.bannerAndCucardas && 
            responseFijos && 
            responseFijos.data && 
            responseFijos.data.bannerAndCucardas
        ) {
            const banners = [
                ...response.data.bannerAndCucardas,
                ...responseFijos.data.bannerAndCucardas
            ];
            dispatch(onGetBannerAndCucardaSucceeded(banners));
        } else if (response && response.data && response.data.bannerAndCucardas) {
            dispatch(onGetBannerAndCucardaSucceeded(response.data.bannerAndCucardas))
        } else if (responseFijos && responseFijos.data && responseFijos.data.bannerAndCucardas) {
            dispatch(onGetBannerAndCucardaSucceeded(responseFijos.data.bannerAndCucardas))
        } else {
            dispatch(onGetBannerAndCucardaFailed())
        }
    };
};

export const onGetBannerAndCucardaSucceeded = (data: any) => ({
    type: ON_GET_BANNER_AND_CUCARDA_SUCCEEDED,
    data
});

const onGetBannerAndCucardaFailed = () => ({
    type: ON_GET_BANNER_AND_CUCARDA__FAILED
});