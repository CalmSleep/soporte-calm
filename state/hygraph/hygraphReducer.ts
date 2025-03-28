import { AnyAction } from '@reduxjs/toolkit';
import { IHygraphState } from './types';
import { ON_GET_HEAD_BANNERS_HYGRAPH_DATA_SUCCEEDED, 
    ON_GET_PILLS_HYGRAPH_DATA_SUCCEEDED,
    ON_GET_SIDECART_HYGRAPH_DATA_SUCCEEDED,
    ON_GET_TYC_HYGRAPH_DATA_SUCCEEDED, 
    ON_GET_TYC_PROMO_HYGRAPH_DATA_SUCCEEDED, 
    ON_SAVE_HYGRAPH_COMPONENT, 
    ON_GET_POPUP_SUCCEEDED,
    ON_GET_BANNER_AND_CUCARDA_SUCCEEDED,
    ON_GET_BIG_BANNERS_SUCCEEDED,
    ON_GET_CLEAR_CACHE_SUCCEEDED,
    ON_GET_CLEAR_CACHE_FAILED,
    ON_GET_REVALIDATE_SUCCEEDED,
    ON_GET_REVALIDATE_FAILED
} from './hygraphConstants';

const initialState: IHygraphState = {
}

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ON_SAVE_HYGRAPH_COMPONENT:
            return {
                ...state,
                componentsData: state.componentsData ? state.componentsData.concat(action.componentData) : [action.componentData]
            }
        case ON_GET_BIG_BANNERS_SUCCEEDED:
            return {
                ...state,
                bigBanners: action.data
            }
        case ON_GET_HEAD_BANNERS_HYGRAPH_DATA_SUCCEEDED:
            return {
                ...state,
                headBanners: action.data
            }
        case ON_GET_CLEAR_CACHE_SUCCEEDED:
            return {
                ...state,
                clearCache: action.data
            }
        case ON_GET_PILLS_HYGRAPH_DATA_SUCCEEDED:
            return {
                ...state,
                pillsData: action.data
            }
        case ON_GET_BANNER_AND_CUCARDA_SUCCEEDED:
            return {
                ...state,
                bannerAndCucarda: action.data
            }
        case ON_GET_SIDECART_HYGRAPH_DATA_SUCCEEDED:
            return {
                ...state,
                bannerSidecart: action.data
            }
        case ON_GET_TYC_PROMO_HYGRAPH_DATA_SUCCEEDED:
            return {
                ...state,
                tycPromotion: action.data
            }
        case ON_GET_TYC_HYGRAPH_DATA_SUCCEEDED:
            return {
                ...state,
                tyc: action.data
            }
        case ON_GET_POPUP_SUCCEEDED:
            return {
                ...state,
                popup: action.data
            }
        case ON_GET_CLEAR_CACHE_FAILED:
            return {
                ...state,
                clearCache: action.data
            }
        case ON_GET_REVALIDATE_SUCCEEDED:
            return {
                ...state,
                revalidate: action.data
            }
        case ON_GET_REVALIDATE_FAILED:
            return {
                ...state,
                revalidate: action.data
            }
        default:
            return state;
    }
}

