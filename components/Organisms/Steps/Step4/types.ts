export type Step4Props = {
  valueSelect: string;
  selectedValue: string;
  notionInfo: IDataSendNotion;
  setNotionInfo: React.Dispatch<React.SetStateAction<IDataSendNotion>>;
};

export type UploadedImage = {
  file: File;
  url?: string;
  loading: boolean;
  error?: string;
};

export interface IDataSendNotion {
  name: string;
  email: string;
  dni: string;
  address: string;
  postCode: string;
  orderNumber: string;
  userIntention: string;
  problemDescription: string[];
  images: UploadedImage[];
  productChange?: string[];
  productReturn?: string[];
}
