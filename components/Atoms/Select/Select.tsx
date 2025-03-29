import React from "react";
import { SelectProps } from "./types";
import { OptionStyles, SelectStyles } from "./styled";

const Select = ({
  name,
  value,
  options,
  onChange,
  onBlur,
  required,
  disabled,
  disableOptions,
  disabledValues,
  width,
  error,
  color,
  height,
  backgroundColor,
  borderColor,
  borderColorFocused,
  borderRadius,
  refSelect,
}: SelectProps) => {
  return (
    <SelectStyles
      name={name}
      ref={refSelect}
      $width={width}
      $borderRadius={borderRadius}
      $borderColor={error ? "rareRed" : borderColor}
      $color={color}
      $borderColorFocused={borderColorFocused}
      $height={height}
      $backgroundColor={backgroundColor}
      value={value}
      onChange={(e) => {
        onChange && onChange(e);
      }}
      onBlur={(e) => {
        onBlur && onBlur(e);
      }}
      required={required}
      disabled={disabled}
    >
      {options.map((option, index) => {
        const label = typeof option === "string" ? option : option.label;
        const value = typeof option === "string" ? option : option.value;

        const isDisabled = disableOptions && disabledValues?.includes(value);
        return (
          <OptionStyles
            key={index}
            value={value}
            $width={width}
            $borderRadius={borderRadius}
            $borderColor={error ? "rareRed" : borderColor}
            $color={color}
            $borderColorFocused={borderColorFocused}
            $height={height}
            $backgroundColor={backgroundColor}
            disabled={isDisabled}
          >
            {label}
          </OptionStyles>
        );
      })}
    </SelectStyles>
  );
};

export default Select;
