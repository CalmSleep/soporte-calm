import Select from "@/components/Atoms/Select/Select";
import React, { useState } from "react";

const Step3Option = () => {
  const [valueStep3Option, setValueStep3Option] = useState({
    value: "",
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueStep3Option({
      value: e.target.value,
    });
  };
  console.log(valueStep3Option);

  return (
    <div className="container">
      {" "}
      <h1>Paso 3/4 - Contanos cuál fue el problema</h1>
      <p>
        Contanos cuál fue el problema. Si no encontrás tu caso en estas
        opciones, escribinos y te ayudamos.
      </p>
      <p>Seleccioná la opción que mejor describa tu caso</p>
      <Select
        onChange={handleOnchange}
        options={[
          {
            value: "1",
            label: "Mi pedido está incompleto o faltan piezas",
          },
          {
            value: "2",
            label: "Recibí un producto demás",
          },
          {
            value: "3",
            label: "Recibí un producto que no es el que pedí",
          },
          {
            value: "4",
            label: "Recibí un producto con una falla de fábrica",
          },
        ]}
      />
      {valueStep3Option.value === "1" ? (
        <p>Valor 1</p>
      ) : valueStep3Option.value === "2" ? (
        <p>Valor 2</p>
      ) : valueStep3Option.value === "3" ? (
        <p>Valor 3</p>
      ) : valueStep3Option.value === "4" ? (
        <p>Valor 4</p>
      ) : null}
    </div>
  );
};

export default Step3Option;
