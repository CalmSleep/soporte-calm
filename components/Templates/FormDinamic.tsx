import HeroForm from "@/components/Organisms/HeroForm/HeroForm";
import { ContainerForm } from "@/components/Templates/styled";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Step1 from "../Organisms/Steps/Step1/Step1";
import Step2 from "../Organisms/Steps/Step2/Step2";
import { useDispatch } from "react-redux";
import { onGetOrder } from "@/state/order/orderActions";

const FormDinamic = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, orderKey } = router.query;

  useEffect(() => {
    if (id && orderKey) {
      dispatch(onGetOrder(id as string, orderKey as string));
    }
  }, [id, orderKey, dispatch]);

  console.log("id", id, "orderKey", orderKey);

  return (
    <ContainerForm>
      <HeroForm />
      <Step1 order={id as string} />
      <Step2 />
    </ContainerForm>
  );
};

export default FormDinamic;
