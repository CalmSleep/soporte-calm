import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";
import { IItem } from "./types";
import { IProduct } from "../products/types";
import { getEdeId } from "@/utils/EdeId";

export const getOpenSideCart = createSelector((state: IStore) => state.cart.openSideCart, openSideCart => openSideCart);

export const getCartItemsCount = createSelector((state: IStore) => state.cart.cartData, cartData => cartData ? cartData.items_count : "");

export const getShippingCost = createSelector((state: IStore) => state.cart.cartData?.totals?.total_shipping, shippingCost => shippingCost);

export const getCartError = createSelector((state: IStore) => state.cart, cart => {return {error: cart.error, errorDetail: cart.errorDetail, addToCartErrorDetail: cart.addToCartErrorDetail}});
export const getTotalPrice = createSelector((state: IStore) => state.cart.cartData?.totals?.total_price, total_price => total_price ?? "0");

export const getSubtotalPrice = createSelector((state: IStore) => state.cart.cartData?.totals?.total_items, total_items => total_items ?? "0");

export const getSubtotalPriceDiscount = createSelector((state: IStore) => state.cart.cartData?.totals?.total_discount, total_discount => total_discount ?? "0");

export const getCartData = createSelector((state: IStore) => state.cart.cartData, cartData => cartData);

export const getHasEDE = createSelector((state: IStore) => state.cart.cartData?.items, items => items?.some((item) => item.id === getEdeId()));

export const getVariationsData = createSelector((state: IStore) => state.cart.variationsData, variationsData => variationsData);

export const getCartCurrentProductsRelated = createSelector((state: IStore) => state.cart.currentProductsRelated, currentProductsRelated => currentProductsRelated);

export const getAllCartCurrentProductsRelated = createSelector((state: IStore, items?: IItem[]) => {return {allProductsRelatedByID: state.cart.allProductsRelatedByID, items}}, ({allProductsRelatedByID, items}) => {
    const itemsIDs = items?.map(i => i.id.toString());
    let currentRelated: IProduct[] = [];
    Object.entries(allProductsRelatedByID ?? []).forEach(([id, related]) => {
        if(!!related && itemsIDs?.includes(id)) {
            currentRelated = currentRelated.concat(related);
        }
    })
    return currentRelated.filter((r, index, self) => 
        index === self.findIndex(u => u.id_prod.toString() === r.id_prod.toString())
    );
});

export const getSKUsCommaSeparated = createSelector((state: IStore) => state.cart.cartData?.items, items => items?.map(i => i.sku).join(","));

export const getCartPostCode = createSelector((state: IStore) => state.cart.cartData?.shipping_address, shipping_address => shipping_address?.postcode);

export const getShowFixedCart = createSelector((state: IStore) => state.cart.showFixedCart, showFixedCart => showFixedCart);

export const getATCVisible = createSelector((state: IStore) => state.cart.isATCVisible, isATCVisible => isATCVisible);

export const getMobileMenu = createSelector((state: IStore) => state.cart.isMobileMenuOpen, isMobileMenuOpen => isMobileMenuOpen);

export const getOpenChat = createSelector((state: IStore) => state.cart.isChatOpen, isChatOpen => isChatOpen);

export const getAbandonoPopup = createSelector((state: IStore) => state.cart.abandonoPopup, abandonoPopup => abandonoPopup);