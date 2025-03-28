import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";

export const getUserIsLogged = createSelector((state: IStore) => state.user.userStatus, userStatus => userStatus);

export const getOpenCheckoutChat = createSelector((state: IStore) => state.user.openCheckoutChat, openCheckoutChat => openCheckoutChat);

export const getUserCP = createSelector((state: IStore) => state.user.cp, cp => cp);

export const getAbTesting = createSelector((state: IStore) => state.user.abTesting, abTesting => abTesting);

export const getB2bSendData = createSelector((state: IStore) => state.user.b2bSendData, b2bSendData => b2bSendData);

export const getHideNavbarByATC = createSelector((state: IStore) => state.user.hideNavbar, hideNavbar => hideNavbar);

export const getAbandonedPopupClicked = createSelector((state: IStore) => state.user.abandonedPopupClicked, abandonedPopupClicked => abandonedPopupClicked);

export const getChatNavigation = createSelector((state: IStore) => state.user.chatNavigation, chatNavigation => chatNavigation);

export const getChatLoaded = createSelector((state: IStore) => state.user.chatLoaded, chatLoaded => chatLoaded);
