import { ON_GET_IS_PICKUP } from "./formDataConstants";

export const onGetIsPickup = (isPickup: boolean) => ({
  type: ON_GET_IS_PICKUP,
  isPickup,
});
