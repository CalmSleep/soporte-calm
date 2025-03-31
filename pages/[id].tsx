import HeroForm from "@/components/Organisms/HeroForm/HeroForm";
import Steps from "@/components/Organisms/Steps/Steps";
import { ContainerForm } from "@/components/Templates/styled";
import React from "react";

const FormDinamicOrden = () => {
  return (
    <ContainerForm>
      <HeroForm />
      <Steps />
    </ContainerForm>
  );
};

export default FormDinamicOrden;
