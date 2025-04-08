import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React from "react";
import items from "../refundItems.json";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import { Step3Select2Props } from "../types";

const Step3Select2 = ({
  checkboxConfirmed,
  selectedTitles,
  handleEditCheckbox,
  handleCheckboxChange,
}: Step3Select2Props) => {
  return (
    <>
      {!checkboxConfirmed ? (
        <StepSelects
          titleParagraph="Selecciona el o los productos que queres devolver:"
          items={items}
          onCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <StepInfo
          info={[`${selectedTitles.join(", ")}`]}
          onClick={handleEditCheckbox}
        />
      )}
    </>
  );
};

export default Step3Select2;
