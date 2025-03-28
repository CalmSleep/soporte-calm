import {
  ON_GET_MODO_RESP_SUCCEEDED,
} from "./modoConstants";

export const onGetModoResp = (modoData: any) => ({
  type: ON_GET_MODO_RESP_SUCCEEDED,
  modoData,
});