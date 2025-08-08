import Select from "@/components/Atoms/Select/Select";
import React from "react";
import Select1Option from "./components/Select1Option";
import { Step3Select1Props } from "../types";
import Select2Option from "./components/Select2Option";
import Select3Option from "./components/Select3Option";
import Select4Option from "./components/Select4Option";
import options from "../step3.json";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";

const Step3Select1 = ({
  orders,
  selectedValue,
  handleOnchangeWithoutConfirm,
  handleCheckboxChange,
  handleEditCheckbox,
  checkboxConfirmed,
  handleCheckboxChangeConfirmed,
  handlePaymentChange,
  infoStep,
}: Step3Select1Props) => {
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
              onCheckboxChange={(isChecked, title, checkId) => {
                handleCheckboxChange(isChecked, title, checkId);
              }}
              orders={orders}
            />
          ) : selectedValue === "2" ? (
            <Select2Option
              onCheckboxChange={handleCheckboxChangeConfirmed}
              handlePaymentChange={handlePaymentChange}
            />
          ) : selectedValue === "3" ? (
            <Select3Option
              onCheckboxChange={(isChecked, title, checkId) => {
                handleCheckboxChange(isChecked, title, checkId);
              }}
              orders={orders}
            />
          ) : selectedValue === "4" ? (
            <Select4Option
              onCheckboxChange={(isChecked, title, checkId) => {
                handleCheckboxChange(isChecked, title, checkId);
              }}
              orders={orders}
            />
          ) : null}
        </>
      ) : (
        <StepInfo info={infoStep} onClick={handleEditCheckbox} />
      )}
    </>
  );
};

export default Step3Select1;
