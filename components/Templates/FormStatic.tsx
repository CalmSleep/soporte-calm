import HeroForm from "../Organisms/HeroForm/HeroForm";
import Step2 from "../Organisms/Steps/Step2/Step2";
import Steps from "../Organisms/Steps/Steps";
import { ContainerForm } from "./styled";

const FormStatic = () => {
  return (
    <ContainerForm>
      <HeroForm />;
      <Steps />
      <Step2 />
    </ContainerForm>
  );
};

export default FormStatic;
