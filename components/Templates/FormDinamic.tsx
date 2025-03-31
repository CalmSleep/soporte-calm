import HeroForm from "@/components/Organisms/HeroForm/HeroForm";
import { ContainerForm } from "@/components/Templates/styled";
import React from "react";
import StepsHeaders from "../Molecules/StepBody/StepsHeader/StepsHeaders";

const FormDinamic = () => {
  return (
    <ContainerForm>
      <HeroForm />
    </ContainerForm>
  );
};

export default FormDinamic;
