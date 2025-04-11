import { abTestingRatio } from "@/utils/abTestingRatio";
import { IKlaviyoEventBodyParams, ILoggedUser } from "./types";
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
  ON_SEND_DATA_TO_NOTION_FAILED,
} from "./userConstants";
import {
  createClientEvent,
  getB2bDataToSlack,
  getDataToNotion,
  getUserIsLogged,
  sendSlackMessage,
} from "./userService";
/* import { IPropsToSend } from "@/components/Organisms/B2bForm/types"; */
import {
  onRedirectLoadingFinished,
  onRedirectLoadingStart,
} from "../loading/loadingActions";
import { IStore } from "../types";

export const onSendDataToNotion = (data: /* IPropsToSend */ any) => {
  return async (dispatch: any) => {
    const response = await getDataToNotion(data);
    if (response) {
      console.log("response", response);
      dispatch(onSendDataToNotionSucceeded(response.success));
    } else {
      dispatch(onSendDataToNotionFailed());
    }
  };
};

const onSendDataToNotionSucceeded = (dataToNotion: ILoggedUser) => ({
  type: ON_SEND_DATA_TO_NOTION_SUCCEEDED,
  dataToNotion,
});

const onSendDataToNotionFailed = () => ({
  type: ON_SEND_DATA_TO_NOTION_FAILED,
});

export const onGetChatLoadedSucceeded = () => ({
  type: ON_GET_CHAT_LOADED_SUCCEEDED,
});

export const onGetChatLoadedFailed = () => ({
  type: ON_GET_CHAT_LOADED_FAILED,
});

export const onGetChatAbandoned = () => ({
  type: ON_GET_CHAT_NAVIGATION,
});

export const onGetAbandonedPopupClicked = () => ({
  type: ON_GET_ABANDONED_POPUP_CLICKED,
});

export const onGetHideNavbarByATC = () => ({
  type: ON_GET_HIDE_NAVBAR_BY_ATC,
});

export const onGetShowNavBarByATC = () => ({
  type: ON_GET_SHOW_NAVBAR_BY_ATC,
});

export const onGetAbTesting = (rating: number) => {
  return async (dispatch: any) => {
    const abResult = abTestingRatio(rating);

    dispatch(onGetAbTestingSucceeded(abResult));
  };
};

const onGetAbTestingSucceeded = (abTesting: boolean) => ({
  type: ON_CALCULATE_AB_RATING,
  abTesting,
});

export const onGetUserIsLogged = () => {
  return async (dispatch: any) => {
    const response = await getUserIsLogged();
    if (response) {
      dispatch(onGetUserIsLoggedSucceeded(response));
    } else {
      dispatch(onGetUserIsLoggedFailed());
    }
  };
};

const onGetUserIsLoggedSucceeded = (userStatus: ILoggedUser) => ({
  type: ON_GET_USER_IS_LOGGED_SUCCEEDED,
  userStatus,
});

const onGetUserIsLoggedFailed = () => ({
  type: ON_GET_USER_IS_LOGGED_FAILED,
});

export const onGetOpenChekoutChatSucceeded = () => ({
  type: ON_GET_OPEN_CHECKOUT_CHAT_SUCCEEDED,
});

export const onEnterCP = (cp: string) => ({
  type: ON_ENTER_CP,
  cp,
});

export const onGetB2bDataToSend = (data: /* IPropsToSend */ any) => {
  return async (dispatch: any) => {
    dispatch(onRedirectLoadingStart());
    const response = await getB2bDataToSlack(data);
    if (response) {
      dispatch(onGetB2bDataToSendSucceeded(response.success));
      dispatch(onRedirectLoadingFinished());
    } else {
      dispatch(onGetB2bDataToSendFailed());
      dispatch(onRedirectLoadingFinished());
    }
  };
};

const onGetB2bDataToSendSucceeded = (b2bSendData: ILoggedUser) => ({
  type: ON_GET_B2B_SEND_DATA_SUCCEEDED,
  b2bSendData,
});

const onGetB2bDataToSendFailed = () => ({
  type: ON_GET_B2B_SEND_DATA_FAILED,
});

export const onCreateStartedCheckoutClientEvent = (
  email: string,
  path: string
) => {
  return async (dispatch: any, getState: any) => {
    const state = getState() as IStore;
    const data: IKlaviyoEventBodyParams = {
      type: "event",
      attributes: {
        metric: {
          data: {
            type: "metric",
            attributes: {
              name: "Started Checkout",
            },
          },
        },
        profile: {
          data: {
            type: "profile",
            attributes: {
              email,
            },
          },
        },
        properties: {
          $value: state.cart.cartData?.totals.total_price,
          ItemNames: state.cart.cartData?.items.map((item) => item.name) || [],
          CheckoutURL: path,
          Items:
            state.cart.cartData?.items.map((item) => ({
              ProductID: item.id,
              SKU: item.sku,
              ProductName: item.name,
              Quantity: item.quantity,
              ItemPrice: item.prices?.regular_price,
              ImageURL: item.images[0].src,
            })) || [],
        },
        time: new Date().toISOString(),
      },
    };
    await createClientEvent(data);
  };
};

export const onSendSlackMessage = (
  channel: string,
  username: string,
  icon_emoji: string,
  text: string,
  buttons?: { text: string; url: string }[]
) => {
  return async () => {
    await sendSlackMessage(channel, username, icon_emoji, text, buttons);
  };
};
