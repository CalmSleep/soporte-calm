export type Step4Props = {
  valueSelect: string;
  selectedValue: string;
  notionInfo: IInfoForm;
  setNotionInfo: React.Dispatch<React.SetStateAction<IInfoForm>>;
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
  productChange?: string[];
  productReturn?: string[];
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
  shippingDate: string;
  requestDate: Date;
  typeRequest: string;
  typeChange: IMultipleSelect[];
  reason: IMultipleSelect[];
  action: string;
  differencePrice: string;
  supplier: string | null;
  images: IImagensNotion[];
  sku?: IMultipleSelect[];
  peaces?: IMultipleSelect[];
  peacesChange?: IMultipleSelect[];
  peacesQuantity?: string;
  comments?: string;
  addressData?: "SI" | "NO" | null;
  addressNew?: string;
  postCode?: string;
}

export type Issue = {
  // productId: string;
  name: string;
  comments?: string;
};
