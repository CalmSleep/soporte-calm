import Input from "@/components/Atoms/Input/Input";
import { InputWrapper, Label, Menssage } from "./styled";
import { DniInput, FloatingInputProps } from "./types";
import Paragraph from "@/components/Atoms/Typography/Text";
import { useState } from "react";
import { validateDni } from "./validate";

const FloatingInput = ({
  label,
  labelRequired,
  labelRequiredColor,
  labelColor,
  labelBackgroundColor,
  input,
  error,
  required,
}: FloatingInputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState<DniInput>({
    dni: 0,
  });
  const [hasError, setHasError] = useState(!!input?.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setHasError(
      !!validateDni({
        ...inputValue,
        [name]: value,
      })
    );
  };
  return (
    <InputWrapper>
      <Input
        {...input}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        type="number"
      />
      <Label
        $color={labelColor}
        $backgroundColor={labelBackgroundColor}
        $input={!!input?.value}
        $isFocused={isFocus}
      >
        {label}{" "}
        <Paragraph
          textTag="span"
          color={isFocus ? input?.colorLabel : labelRequiredColor}
        >
          {labelRequired}
        </Paragraph>
      </Label>
      {input?.required && !input?.error && isFocus && (
        <Menssage $hasRequired>{required}</Menssage>
      )}
      {input?.error && <Menssage $hasError>{hasError.valueOf()}</Menssage>}
    </InputWrapper>
  );
};

export default FloatingInput;
