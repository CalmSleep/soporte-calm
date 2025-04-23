import Input from "@/components/Atoms/Input/Input";
import { InputWrapper, Label, Menssage } from "./styled";
import { FloatingInputProps } from "./types";
import Paragraph from "@/components/Atoms/Typography/Text";
import { useState } from "react";

const FloatingInput = ({
  width,
  marginTop,
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
    <InputWrapper $width={width} $marginTop={marginTop}>
      <Input
        {...input}
        onFocus={() => setIsFocus(false)}
        //  onBlur={() => setIsFocus(true)}
        onBlur={() =>
          error || required ? setIsFocus(true) : setIsFocus(false)
        }
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
      {required && !input?.error && !input?.value && isFocus && (
        <Menssage $hasRequired>{required}</Menssage>
      )}
      {isFocus && <Menssage $hasError>{error}</Menssage>}
    </InputWrapper>
  );
};

export default FloatingInput;
