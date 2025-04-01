import HeroForm from "@/components/Organisms/HeroForm/HeroForm";
import { ContainerForm } from "@/components/Templates/styled";
import React from "react";
import { useRouter } from "next/router";
import Step1 from "../Organisms/Steps/Step1/Step1";
import Step2 from "../Organisms/Steps/Step2/Step2";

const FormDinamic = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ContainerForm>
      <HeroForm />
      <Step1 order={id as string} />
      <Step2 />
    </ContainerForm>
  );
};

export default FormDinamic;
