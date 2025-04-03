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

const Step3Select1 = ({
  selectedValue,
  handleOnchangeWithoutConfirm,
  handleCheckboxChange,
}: Step3Select1Props) => {
  const orders = useSelector(getThankuContent);
  console.log(orders);

  console.log(selectedValue);
  return (
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
        <Select1Option onCheckboxChange={handleCheckboxChange} />
      ) : selectedValue === "2" ? (
        <Select2Option />
      ) : selectedValue === "3" ? (
        <Select3Option />
      ) : selectedValue === "4" ? (
        <Select4Option />
      ) : null}

      {/* {checkboxConfirmed && <Step4 />}
      {selectedValue === "2" && <p>Valor 2</p>}
      {selectedValue === "3" && <p>Valor 3</p>}
      {selectedValue === "4" && <p>Valor 4</p>} */}
    </>
  );
};

export default Step3Select1;
