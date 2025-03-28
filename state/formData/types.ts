export interface IFormData {
  address?: string;
  province?: string;
  city?: string;
  zipCode?: string | undefined;
  isPickup?: boolean;
  pickupOption?: string;
  preferedTime?: string | null;
  preferedDate?: Date | null;
  notes?: string;
  placeDetails?: string;
  selectedPickUpStore?: string | null;
  checkDonar?: boolean | null;
}
