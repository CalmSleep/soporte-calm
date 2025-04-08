import Select from "@/components/Atoms/Select/Select";
import React from "react";
import Select1Option from "./components/Select1Option";
import { Step3Select1Props } from "./types";
import Select2Option from "./components/Select2Option";
import Select3Option from "./components/Select3Option";
import Select4Option from "./components/Select4Option";
import options from "./step3.json";
import { useSelector } from "react-redux";
import { getThankuContent } from "@/state/order/orderSelector";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import optionStep3 from "./step3.json";

const Step3Select1 = ({
  selectedValue,
  handleOnchangeWithoutConfirm,
  handleCheckboxChange,
  selectedTitles,
  handleEditCheckbox,
  checkboxConfirmed,
  handleClickAcordion,
  valueSelect,
}: Step3Select1Props) => {
  const orders = useSelector(getThankuContent);
  //console.log(valueSelect);

  return (
    <>
      {!checkboxConfirmed ? (
        <>
          <Select
            onChange={handleOnchangeWithoutConfirm}
            value={selectedValue || ""}
            options={
              selectedValue === null
                ? options
                : options.filter((opt) => opt.value !== "")
            }
          />
          {selectedValue === "1" ? (
            <Select1Option
              onCheckboxChange={handleCheckboxChange}
              handleClickAcordion={handleClickAcordion}
            />
          ) : selectedValue === "2" ? (
            <Select2Option onCheckboxChange={handleCheckboxChange} />
          ) : selectedValue === "3" ? (
            <Select3Option onCheckboxChange={handleCheckboxChange} />
          ) : selectedValue === "4" ? (
            <Select4Option />
          ) : null}
        </>
      ) : (
        <StepInfo
          info={[
            `${
              optionStep3.find((item) => item.value === selectedValue)?.label ||
              "Opción no encontrada"
            }`,
            `${selectedTitles.join(", ")}`,
          ]}
          onClick={handleEditCheckbox}
        />
      )}

      {/* {!checkboxConfirmed ? (
       <Select
       onChange={handleOnchangeWithoutConfirm}
       value={selectedValue || ""}
       options={
         selectedValue === null
           ? options
           : options.filter((opt) => opt.value !== "")
       }
     />
     {selectedValue === "1" ? (
       <Select1Option onCheckboxChange={handleCheckboxChange} />
     ) : selectedValue === "2" ? (
       <Select2Option onCheckboxChange={handleCheckboxChange} />
     ) : selectedValue === "3" ? (
       <Select3Option />
     ) : selectedValue === "4" ? (
       <Select4Option />
     ) : null}
     ) : (
      <StepInfo
          info={[
            `${
              optionStep3.find((item) => item.value === String(selectedValue))?.label 
                 || "Opción no encontrada"
            }`,
            `${selectedTitles.join(", ")}`,
          ]}
          onClick={handleEditCheckbox}
        />
     )} */}
    </>
  );
};

export default Step3Select1;
