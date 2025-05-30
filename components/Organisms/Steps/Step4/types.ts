export type Step4Props = {
  valueSelect: string;
  selectedValue: string;
  notionInfo: IInfoForm;
  selectedTitleObjects: { title: string; checkId: string; quantity: number }[];
};

export type Piece = { label: string };

export type ActionMap = {
  [keyword: string]: string;
};

export type ParsedResult = {
  names: { name: string }[];
  quantities: string;
  otherMessage?: string;
};

export interface IInfoForm {
  problemDescription: string[];
}

export type UploadedImage = {
  file: File;
  url?: string;
  loading: boolean;
  error?: string;
};

export interface IImagensNotion {
  name: string;
  type: string;
  external: {
    url: string;
  };
}

export interface IMultipleSelect {
  name: string;
  comments?: string;
}

export interface IDataSendNotion {
  orderNumber: string;
  name: string;
  email: string;
  status: string;
  shippingDate: string | null;
  requestDate: Date;
  typeRequest: string;
  typeChange: IMultipleSelect[];
  reason: IMultipleSelect[];
  action: string;
  differencePrice: string;
  supplier: string | null;
  images: IImagensNotion[];
  skuOriginal?: IMultipleSelect[];
  skuChange?: IMultipleSelect[];
  skuQuantityOriginal?: string;
  skuQuantityChange?: string;
  peaces?: IMultipleSelect[];
  peacesChange?: IMultipleSelect[];
  peacesQuantity?: string;
  comments?: string;
  refund?: string;
  addressData?: "SI" | "NO" | null;
  addressNew?: string;
  postCode?: string;
}

export type Issue = {
  name: string;
  comments?: string;
};
