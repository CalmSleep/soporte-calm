import { AnyAction } from "@reduxjs/toolkit";
import { ILoggedUser } from "./types";
import {
    ON_GET_USER_IS_LOGGED_SUCCEEDED,
    ON_GET_USER_IS_LOGGED_FAILED,
    ON_GET_OPEN_CHECKOUT_CHAT_SUCCEEDED,
    ON_ENTER_CP,
    ON_CALCULATE_AB_RATING,
    ON_GET_B2B_SEND_DATA_SUCCEEDED,
    ON_GET_B2B_SEND_DATA_FAILED,
    ON_GET_HIDE_NAVBAR_BY_ATC,
    ON_GET_SHOW_NAVBAR_BY_ATC,
    ON_GET_ABANDONED_POPUP_CLICKED,
    ON_GET_CHAT_NAVIGATION,
    ON_GET_CHAT_LOADED_SUCCEEDED,
    ON_GET_CHAT_LOADED_FAILED,
    ON_SEND_DATA_TO_NOTION_SUCCEEDED,
    ON_SEND_DATA_TO_NOTION_FAILED
} from "./userConstants";

const initialState: ILoggedUser = {
    error: false,
    openCheckoutChat: false,
    chatNavigation: false
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ON_SEND_DATA_TO_NOTION_SUCCEEDED:
            return {
                ...state,
                dataToNotion: true
            };
        case ON_SEND_DATA_TO_NOTION_FAILED:
            return {
                ...state,
                dataToNotion: false
            };

        case ON_GET_CHAT_LOADED_SUCCEEDED:
            return {
                ...state,
                chatLoaded: true
            };
        case ON_GET_CHAT_LOADED_FAILED:
            return {
                ...state,
                chatLoaded: false
            };
        case ON_GET_ABANDONED_POPUP_CLICKED:
            return {
                ...state,
                abandonedPopupClicked: true
            };
        case ON_GET_CHAT_NAVIGATION:
            return {
                ...state,
                chatNavigation: true
            };
        case ON_CALCULATE_AB_RATING:
            return {
                ...state,
                abTesting: action.abTesting
            };
        case ON_GET_HIDE_NAVBAR_BY_ATC:
            return {
                ...state,
                hideNavbar: true
            };
        case ON_GET_SHOW_NAVBAR_BY_ATC:
            return {
                ...state,
                hideNavbar: false
            };
        case ON_GET_B2B_SEND_DATA_SUCCEEDED:
            return {
                ...state,
                b2bSendData: action.b2bSendData
            };
        case ON_GET_USER_IS_LOGGED_SUCCEEDED:
            return {
                ...state,
                userStatus: action.userStatus
            };
        case ON_GET_USER_IS_LOGGED_FAILED:
            return {
                ...state,
                error: true
            };
        case ON_ENTER_CP:
            return {
                ...state,
                cp: action.cp
            };
        case ON_GET_OPEN_CHECKOUT_CHAT_SUCCEEDED:
            return {
                ...state,
                openCheckoutChat: true
            };
        case ON_GET_B2B_SEND_DATA_FAILED:
            return {
                ...state,
                b2bSendData: false
            };
        default:
           return state;
    }
}