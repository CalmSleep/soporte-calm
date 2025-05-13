import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './types';
import { CloseButton, Content, Header, ModalContent, Overlay, Title } from './styles';
import { vietnamPro } from '@/pages/_app';

const NewModals: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose,
   children, 
   title, 
   maxWidth, 
   maxHeight,
   responsiveMobile,
   hideCloseButton,
   overflow
 }) => {
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
    <div className={vietnamPro.variable}>
    <Overlay onClick={onClose}>
      <ModalContent 
      onClick={(e: React.MouseEvent) => e.stopPropagation()} 
      $maxWidth={maxWidth} 
      $maxHeight={maxHeight} 
      $responsiveMobile={responsiveMobile}
      >
        {
          !hideCloseButton &&
          <Header>
          {title && <Title>{title}</Title>}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        }
        <Content $overflow={overflow}>
          {children}
        </Content>
      </ModalContent>
    </Overlay>,
    </div>,
    document.body
  );
};

export default NewModals;