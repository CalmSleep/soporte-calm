import HeroForm from "../Organisms/HeroForm/HeroForm";
import Steps1 from "../Organisms/Steps/Steps1";
import { ContainerForm } from "./styled";

const FormStatic = () => {
  return (
    <ContainerForm>
      <HeroForm />;
      <Steps1 />
    </ContainerForm>
  );
};

export default FormStatic;
