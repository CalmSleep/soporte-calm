import Button from "@/components/Atoms/Buttons/Button";
import Select from "@/components/Atoms/Select/Select";
import React, { useState } from "react";
import Step3 from "../Step3/Step3Option";
import Step3Option from "../Step3/Step3Option";

const Step2 = () => {
  const [valueStep2, setValueStep2] = useState({
    value: "",
  });
  const [confirmedValue, setConfirmedValue] = useState<string | null>(null);
  const handleOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueStep2({
      value: e.target.value,
    });
  };
  const handleConfirm = () => {
    setConfirmedValue(valueStep2.value);
  };
  console.log(confirmedValue);

  return (
    <div className="container">
      <h1>Paso 2/4 - Contanos cómo podemos ayudarte</h1>
      <p>Seleccioná la opción que mejor describa tu caso</p>
      {confirmedValue === null ? (
        <>
          <Select
            onChange={handleOnchange}
            value={valueStep2.value}
            options={[
              ...(valueStep2.value === ""
                ? [{ value: "", label: "Selecciona tu caso" }]
                : []),
              {
                value: "1",
                label: "Tuve un problema con el o los productos que recibí",
              },
              { value: "2", label: "Quiero devolver el producto" },
              { value: "3", label: "Quiero cambiar el producto" },
            ]}
          />
          <Button
            backgroundColor="lead"
            textColor="drWhite"
            borderRadius="1000px"
            fontSize="24px"
            responsiveMobile={{
              fontSize: "18px",
            }}
            disabled={valueStep2.value === ""}
            disableStyles={true}
            onClick={handleConfirm}
          >
            Siguiente
          </Button>
        </>
      ) : (
        <div>
          <p>Tuve un problema con el o los productos que recibí.</p>
          <button onClick={() => setConfirmedValue(null)}>Editar</button>
        </div>
      )}

      {confirmedValue === "1" && <Step3Option />}
      {confirmedValue === "2" && <p>step3opcion2</p>}
      {confirmedValue === "3" && <p>step3opcion3</p>}
    </div>
  );
};

export default Step2;
