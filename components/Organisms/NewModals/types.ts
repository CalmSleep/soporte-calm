type responsiveMobile = {
  maxWidth?: string;
  maxHeight?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    maxWidth?: string;
    maxHeight?: string;
    hideCloseButton?: boolean
    responsiveMobile?: responsiveMobile
    overflow?: "visible" | "hidden" | "clip" | "scroll" | "auto"
}

export interface IStyleModal {
   $maxWidth?: string;
  $maxHeight?: string;
  $responsiveMobile?: responsiveMobile
}
