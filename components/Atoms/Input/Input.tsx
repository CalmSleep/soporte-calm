import { InputProps } from "./types";
import { InputStyles } from "./styled";

const Input = ({
  children,
  type,
  name,
  placeholder,
  value,
  onFocus,
  onChange,
  onBlur,
  required,
  disabled,
  checked,
  width,
  error,
  color,
  height,
  backgroundColor,
  refInput,
  autoComplete,
  borderBottom,
  borderRadius,
  borderColor,
  borderColorFocused,
  colorLabel,
  checkColor,
  checkBorderColor,
  padding,
  appearance,
  display,
  fontSize,
  responsiveMobile,
}: InputProps) => {
  return (
    <InputStyles
      type={type}
      name={name}
      $width={width}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange && onChange(e);
      }}
      onBlur={(e) => {
        onBlur && onBlur(e);
      }}
      onFocus={(e) => {
        onFocus && onFocus(e);
      }}
      required={required}
      $borderRadius={borderRadius}
      disabled={disabled}
      $borderColor={error ? "rareRed" : borderColor}
      $color={color}
      $borderColorFocused={borderColorFocused}
      $height={height}
      $backgroundColor={backgroundColor}
      checked={checked}
      ref={refInput}
      autoComplete={autoComplete}
      $colorLabel={colorLabel}
      $checkColor={checkColor}
      $checkBorderColor={checkBorderColor}
      $padding={padding}
      $appearance={appearance}
      multiple={type === "file" ? true : false}
      accept={type === "file" ? "image/*" : ""}
      $display={display}
      $fontSize={fontSize}
      $borderBottom={borderBottom}
      $responsiveMobile={responsiveMobile}
    >
      {children}
    </InputStyles>
  );
};

export default Input;
