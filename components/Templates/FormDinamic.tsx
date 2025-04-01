import HeroForm from "@/components/Organisms/HeroForm/HeroForm";
import { ContainerForm } from "@/components/Templates/styled";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { onGetOrder } from "@/state/order/orderActions";
import Step1 from "../Organisms/Steps/Step1/Step1";
import Step2 from "../Organisms/Steps/Step2/Step2";

const FormDinamic = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, orderKey } = router.query;

  useEffect(() => {
    if (id && orderKey) {
      dispatch(onGetOrder(id as string, orderKey as string));
    }
  }, [id, orderKey, dispatch]);
  return (
    <ContainerForm>
      <HeroForm />
      <Step1 order={id as string} orderKey={orderKey as string} />
      <Step2 />
    </ContainerForm>
  );
};

export default FormDinamic;
