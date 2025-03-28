import Input from "@/components/Atoms/Input/Input";
import { InputWrapper, Label } from "./styled";
import { FloatingInputProps } from "./types";
import Paragraph from "@/components/Atoms/Typography/Text";
import { useState } from "react";

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
  return (
    <InputWrapper>
      <Input
        {...input}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <Label $color={labelColor} $backgroundColor={labelBackgroundColor}>
        {label}
        <Paragraph
          textTag="span"
          color={isFocus ? input?.colorLabel : labelRequiredColor}
        >
          {labelRequired}
        </Paragraph>
      </Label>
      {input?.required && <span>{required}</span>}
      {input?.error && <span>{error}</span>}
    </InputWrapper>
  );
};

export default FloatingInput;
