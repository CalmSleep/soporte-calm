import HeroForm from "@/components/Organisms/HeroForm/HeroForm";
import { ContainerForm } from "@/components/Templates/styled";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Step1 from "../Organisms/Steps/Step1/Step1";
import Step2 from "../Organisms/Steps/Step2/Step2";
import { useDispatch, useSelector } from "react-redux";
import { onGetOrder } from "@/state/order/orderActions";
import ModalMeli from "../Organisms/Steps/Modals/ModalMeli";
import ModalFrav from "../Organisms/Steps/Modals/ModalFrav";
import ModalNotFound from "../Organisms/Steps/Modals/ModalNotFound";
import { getThankuContent } from "@/state/order/orderSelector";
import SkeletonLoader from "../Atoms/SkeletonLoader/SkeletonLoader";

const FormDinamic = () => {
  const dniUser = useSelector(getThankuContent);
  //    console.log("dniUser", dniUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, orderKey } = router.query;

  useEffect(() => {
    if (id && orderKey) {
      dispatch(onGetOrder(id as string, orderKey as string));
    }
  }, [id, orderKey, dispatch]);

  return (
    <ContainerForm>
      <HeroForm />
      <Step1 dniUser={dniUser?.dni} order={id as string} />
      {dniUser?.dni ? (
        <Step2 />
      ) : (
        <SkeletonLoader height="20px" width="50%" borderRadius="1000px" />
      )}

      {/* {saleSource === "webcalm" || saleSource?.includes("localm") ? (
        <>
        </>
      ) : saleSource === "meli" ? (
        <ModalMeli isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : saleSource === "null" ? (
        <ModalNotFound isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <ModalFrav isOpen={isOpen} setIsOpen={setIsOpen} />
      )} */}
    </ContainerForm>
  );
};

export default FormDinamic;
