export type Step4Props = {
  valueSelect: string;
  selectedValue: string;
  notionInfo: IDataSendNotion;
  setNotionInfo: React.Dispatch<React.SetStateAction<IDataSendNotion>>;
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
  images: string[];
  productChange?: string[];
  productReturn?: string[];
}
