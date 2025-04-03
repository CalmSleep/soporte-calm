import { onSendDataToNotion } from "@/state/user/userActions";
import StepsHeaders from "../Molecules/StepBody/StepsHeader/StepsHeaders";
import HeroForm from "../Organisms/HeroForm/HeroForm";
import Step1 from "../Organisms/Steps/Step1/Step1";
import { ContainerForm } from "./styled";
import { useDispatch } from "react-redux";

const FormStatic = () => {
  const dispatch = useDispatch();

  const handleSubmitToNotion = async () => {
    dispatch(onSendDataToNotion({
      name: "Cliente de Prueba"
    }));
  };

  return (
    <ContainerForm>
      <HeroForm />
      <Step1 />
      <div>
        <button onClick={handleSubmitToNotion}>
          Enviar nombre de prueba a Notion
        </button>
      </div>
    </ContainerForm>
  );
};

export default FormStatic;
