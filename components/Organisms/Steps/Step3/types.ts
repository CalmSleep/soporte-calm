import { IgetProducts } from "@/state/products/types";

type ValueObject = {
  [key: string]: string[];
};

export type ProductoData = {
  id: string[];
  title: string;
  values: ValueObject[];
};
export type Resultado = {
  productName: string;
  comentario: string;
  child: any;
};

export type Step3Props = {
  valueSelect: string | null;
  setConfirmedValue: React.Dispatch<React.SetStateAction<string | null>>;
  // notionInfo: IDataSendNotion;
  // setNotionInfo: React.Dispatch<React.SetStateAction<IDataSendNotion>>;
};
export interface Step3Select1Props {
  orders: any;
  selectedValue: string | null;
  handleOnchangeWithoutConfirm: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleCheckboxChange: (
    isChecked: boolean,
    title: string,
    checkId: string,
    quantity?: number,
    skuChild?: string
  ) => void;
  handleCheckboxChangeConfirmed: (
    isChecked: boolean,
    title: string,
    checkId: string,
    radioGroup: string[],
    quantity?: number,
    skuChild?: string
  ) => void;
  selectedTitles: string[];
  handleEditCheckbox: () => void;
  checkboxConfirmed: boolean;
  valueSelect: string | null;
  handlePaymentChange?: (
    paymentLabel: string,
    payments: { value: string; label: string }[]
  ) => void;
  infoStep: string[];
  idVariation?: number[];
  setIdVariation?: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface SelectOptionProps {
  orders?: any;
  onCheckboxChange: (
    isChecked: boolean,
    title: string,
    checkId: string,
    radioGroup: string[],
    quantity?: number,
    skuChild?: string
  ) => void;
  handlePaymentChange?: (
    paymentLabel: string,
    payments: { value: string; label: string }[]
  ) => void;
  idVariation?: number[];
  setIdVariation?: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface Step3Select2and3Props {
  orders?: any;
  checkboxConfirmed: boolean;
  checkSeleccionado: boolean;
  selectedTitles: string[];
  setSelectedTitles?: React.Dispatch<React.SetStateAction<string[]>>;
  valueSelect: string | null;
  setConfirmedValue?: React.Dispatch<React.SetStateAction<string | null>>;
  handleEditCheckbox: () => void;
  handleCheckboxChange: (
    isChecked: boolean,
    title: string,
    checkId: string,
    quantity?: number,
    skuChild?: string
  ) => void;
  handleCheckboxChangeConfirmed: (
    isChecked: boolean,
    title: string,
    checkId: string,
    radioGroup: string[],
    quantity?: number,
    skuChild?: string
  ) => void;
  infoStep: string[];
  modalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmCheckbox?: () => void;
  products?: IgetProducts[];
  resultadoFinal?: Resultado[];
  idVariation?: number[];
  setIdVariation?: React.Dispatch<React.SetStateAction<number[]>>;
  idVariationChange?: number[];
  setIdVariationChange?: React.Dispatch<React.SetStateAction<number[]>>;
  productsLoading?: boolean;
  setSelectedTitleObjects?: React.Dispatch<React.SetStateAction<any[]>>;
}

export type Category = {
  id: string;
  title: string;
  pieces: {
    label: string;
  }[];
};
