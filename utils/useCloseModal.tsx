interface closeModal {
    ref: React.RefObject<HTMLDivElement>;
    redChildren?: React.RefObject<HTMLDivElement>;
    onClose: () => void;
}

export const useCloseModal = ({ref, redChildren, onClose}: closeModal) => {
    const handleOutsideClick = (event: any) => {
        if (redChildren){
            if (ref.current && ref.current.contains(event.target) && !(redChildren.current && redChildren.current.contains(event.target))) {
                onClose()
              }
        } else {
            if (ref.current && ref.current.contains(event.target)) {
                onClose()
              }
        }
    };

    const addOutsideClickListener = () => {
        document.addEventListener('mousedown', handleOutsideClick);
      };
    
      const removeOutsideClickListener = () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    
      return { addOutsideClickListener, removeOutsideClickListener };
}   
