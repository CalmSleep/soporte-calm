export type Step4Props = {
  valueSelect: string;
  selectedValue: string;
  notionInfo: IInfoForm;
  setNotionInfo: React.Dispatch<React.SetStateAction<IInfoForm>>;
};

type ProblemOption = {
  name: string;
  value: string;
};

export interface IInfoForm {
  problemDescription: string[];
  productChange?: string[];
  productReturn?: string[];
}

export interface IImagensNotion {
  name: string;
  type: string;
  external: {
    url: string[];
  };
}

export interface IMultipleSelect {
  name: string;
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
  images: IImagensNotion[];
  sku?: IMultipleSelect[];
  comments?: string;
  address?: string;
  postCode?: string;
}
