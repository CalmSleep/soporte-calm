export interface ModalProps {
  children: React.ReactNode;
}
export interface IPropsChildrens {
  modalRef?: React.RefObject<HTMLDivElement>;
  modalRefChildren?: React.RefObject<HTMLDivElement>;
  modalHandle?: () => void;
  modal?: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  imgUrl?: string;
  arrImages?: string[]
  showText?: boolean;
  installments?: number;
  isfromNavBar?: boolean
}