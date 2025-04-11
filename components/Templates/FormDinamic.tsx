import HeroForm from "@/components/Organisms/HeroForm/HeroForm";
import { ContainerForm } from "@/components/Templates/styled";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Step1 from "../Organisms/Steps/Step1/Step1";
import Step2 from "../Organisms/Steps/Step2/Step2";
import { useDispatch } from "react-redux";
import { onGetOrder } from "@/state/order/orderActions";
import ModalMeli from "../Organisms/Steps/Step2/Modals/ModalMeli";
import ModalFrav from "../Organisms/Steps/Step2/Modals/ModalFrav";
import ModalNotFound from "../Organisms/Steps/Step2/Modals/ModalNotFound";

const FormDinamic = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, orderKey, saleSource } = router.query;

  useEffect(() => {
    if (id && orderKey) {
      dispatch(onGetOrder(id as string, orderKey as string));
    }
    if (saleSource === "meli") {
      setIsOpen(true);
    }
    if (saleSource === "frav") {
      setIsOpen(true);
    }
    if (saleSource === "null") {
      setIsOpen(true);
    }
  }, [id, orderKey, dispatch]);

  return (
    <ContainerForm>
      <HeroForm />

      {saleSource === "webcalm" || saleSource?.includes("localm") ? (
        <>
          <Step1 order={id as string} />
          <Step2 />
        </>
      ) : saleSource === "meli" ? (
        <ModalMeli isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : saleSource === "null" ? (
        <ModalNotFound isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <ModalFrav isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </ContainerForm>
  );
};

export default FormDinamic;
