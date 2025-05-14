import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './types';
import { CloseButton, Content, Header, ModalContent, Overlay, Title } from './styles';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, maxWidth, hideCloseButton }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    //prevent scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      setMounted(false);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()} $maxWidth={maxWidth}>
        {
          !hideCloseButton &&
          <Header>
          {title && <Title>{title}</Title>}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        }
        <Content>
          {children}
        </Content>
      </ModalContent>
    </Overlay>,
    document.body
  );
};

export default Modal;