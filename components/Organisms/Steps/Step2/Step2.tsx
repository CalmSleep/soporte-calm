import Select from "@/components/Atoms/Select/Select";
import React from "react";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import useValueSelect from "@/hooks/useValueSelect";
import Step3 from "../Step3/Step3";
import options from "../Step2/step2.json";
import { infoString } from "../util";

const Step2 = () => {
  const {
    confirmedValue,
    selectedValue,
    handleOnchangeButton,
    handleConfirm,
    setConfirmedValue,
    notionInfo,
    setNotionInfo,
  } = useValueSelect();
  console.log(selectedValue);

  // React.useEffect(() => {
  //   setNotionInfo({
  //     ...notionInfo,
  //     userIntention: infoString,
  //   });
  // }, [confirmedValue]);
  console.log("notion step 2", notionInfo);

  return (
    <>
      <StepsHeaders
        span="Paso 2/4 - "
        title="Contanos cómo podemos ayudarte"
        backgroundColor={confirmedValue === null ? "drWhite" : "white"}
        paragraph={
          confirmedValue !== null
            ? ""
            : "Seleccioná la opción que mejor describa tu caso"
        }
        onClick={() => {
          handleConfirm();
        }}
        value={selectedValue === null ? true : false}
        button={confirmedValue === null ? true : false}
      >
        {confirmedValue === null ? (
          <Select
            onChange={handleOnchangeButton}
            value={selectedValue || ""}
            options={
              selectedValue === null
                ? options
                : options.filter((opt) => opt.value !== "")
            }
          />
        ) : (
          <StepInfo
            info={[infoString(confirmedValue)]}
            onClick={() => {
              setConfirmedValue(null);
              setNotionInfo({
                ...notionInfo,
                userIntention: "",
                problemDescription: [],
                productReturn: [],
                productChange: [],
              });
            }}
          />
        )}
      </StepsHeaders>
      {confirmedValue !== null && (
        <Step3
          valueSelect={confirmedValue}
          setConfirmedValue={setConfirmedValue}
          notionInfo={notionInfo}
          setNotionInfo={setNotionInfo}
        />
      )}
    </>
  );
};

export default Step2;
