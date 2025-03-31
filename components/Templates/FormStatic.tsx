import StepsHeaders from "../Molecules/StepBody/StepsHeader/StepsHeaders";
import HeroForm from "../Organisms/HeroForm/HeroForm";
import Step1 from "../Organisms/Steps/Step1/Step1";
import { ContainerForm } from "./styled";

const FormStatic = () => {
  return (
    <ContainerForm>
      <HeroForm />;
      <Step1 />
    </ContainerForm>
  );
};

export default FormStatic;
