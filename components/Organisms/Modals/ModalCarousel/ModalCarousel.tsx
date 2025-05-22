import { ModalSidecart, DivButtonClose, ClickedGalley } from "./styled";
import Images from "@/components/Atoms/Images/Images";
import { IPropsChildrens } from "./types";
import { CloseIcon } from "@/components/Organisms/MainBlock/mainBlockicons";
import Icons from "@/components/Atoms/Icons/Icons";

const ModalCarousel = (props: IPropsChildrens) => {
  return (
    props.modal &&
    props.arrImages && (
      <ModalSidecart ref={props.modalRef} onClick={() => props.modalHandle?.()}>
        <div ref={props.modalRefChildren} className="header-cart">
          <DivButtonClose className="header-closer-2">
            <Icons width="60%">{CloseIcon()}</Icons>
          </DivButtonClose>
          {props.arrImages &&
            props.arrImages.map((image, index) => (
              <ClickedGalley onClick={() => props.modalHandle?.()} key={index}>
                <Images
                  src={image}
                  alt="Image Gallery"
                  height="100%"
                  width="100%"
                  isLazy
                />
              </ClickedGalley>
            ))}
        </div>
      </ModalSidecart>
    )
  );
};

export default ModalCarousel;
