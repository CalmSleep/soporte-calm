import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";

export const getFormData = createSelector(
  (state: IStore) => state.formData,
  (formData) => formData 
);

export const getPickupOption = createSelector(
  (state: IStore) => state.formData,
  (formData) => formData?.isPickup 
);
