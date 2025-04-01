import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import React, { useState } from "react";

const Select1Option = () => {
  return (
    <>
      <Paragraph>Seleccioná el producto o las piezas faltantes:</Paragraph>
      <div className="flex">
        <Input width="16px" type="checkbox" color="mangoTango" height="16px" />
        <Paragraph>Alta almohada (65x35cm)</Paragraph>
      </div>
      <div className="flex">
        <Input width="16px" type="checkbox" color="mangoTango" height="16px" />
        <Paragraph>Alta almohada (65x35cm)</Paragraph>
      </div>
      <div className="flex">
        <Input width="16px" type="checkbox" color="mangoTango" height="16px" />
        <Paragraph>Mesa ratona</Paragraph>
      </div>
      <div className="flex">
        <fieldset className="flex-2">
          <label>
            <input
              type="radio"
              name="problema"
              value="falta-producto-completo"
            />
            Falta este producto completo
          </label>
          <label>
            <input
              type="radio"
              name="problema"
              value="falta-producto-completo"
            />
            Falta este producto completo
          </label>
        </fieldset>
      </div>
    </>
  );
};

export default Select1Option;
