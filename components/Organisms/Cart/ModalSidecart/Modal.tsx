import { ModalSidecart } from "./styled";
import { useRef, useEffect, ReactNode } from "react";
import { useCloseModal } from "@/utils/useCloseModal";

interface IProps {
  children: ReactNode;
  isOpen: boolean | (() => void);
  closeModal: () => void;
  titleHeader: string;
}

const Modal = ({ children, isOpen, closeModal, titleHeader }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRefChildren = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { addOutsideClickListener, removeOutsideClickListener } =
      useCloseModal({
        ref: modalRef,
        redChildren: modalRefChildren,
        onClose: closeModal,
      });

    addOutsideClickListener();

    return () => removeOutsideClickListener();
  }, []);

  return (
    <ModalSidecart ref={modalRef} $isOpen={isOpen}>
      <div
        ref={modalRefChildren}
        className={`modal-container ${isOpen ? "open" : ""}`}
      >
        <div className="header-cart">
          <div className="header-cart-closer">
            <p className="header-closer-1">{titleHeader}</p>
            <button
              title="Cerrar modal"
              aria-label="Cerrar modal"
              className="header-closer-2"
              onClick={closeModal}
            >
              <img
                src="https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/527083b1-56bb-4a75-1a98-e7cffd083800/fit=cover"
                alt="cerrar carrito img"
                loading="lazy"
                /* fetchPriority="low" */
              />
            </button>
          </div>
        </div>

        {children}
      </div>
    </ModalSidecart>
  );
};

export default Modal;
