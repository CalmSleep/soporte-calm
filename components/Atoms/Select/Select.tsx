import React from "react";
import { SelectProps } from "./types";
import {
  OptionStyles,
  SelectStyles,
  SelectWrapper,
  SelectIcon,
} from "./styled";

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
    <SelectWrapper>
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

      <SelectIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M20.031 10.1515L12.531 17.6515C12.4614 17.7213 12.3787 17.7766 12.2876 17.8143C12.1966 17.8521 12.099 17.8715 12.0004 17.8715C11.9019 17.8715 11.8043 17.8521 11.7132 17.8143C11.6222 17.7766 11.5394 17.7213 11.4698 17.6515L3.96979 10.1515C3.82906 10.0108 3.75 9.81992 3.75 9.6209C3.75 9.42188 3.82906 9.23101 3.96979 9.09028C4.11052 8.94954 4.30139 8.87048 4.50042 8.87048C4.69944 8.87048 4.89031 8.94954 5.03104 9.09028L12.0004 16.0606L18.9698 9.09028C19.0395 9.02059 19.1222 8.96532 19.2132 8.92761C19.3043 8.88989 19.4019 8.87048 19.5004 8.87048C19.599 8.87048 19.6965 8.88989 19.7876 8.92761C19.8786 8.96532 19.9614 9.02059 20.031 9.09028C20.1007 9.15996 20.156 9.24268 20.1937 9.33373C20.2314 9.42477 20.2508 9.52235 20.2508 9.6209C20.2508 9.71945 20.2314 9.81703 20.1937 9.90807C20.156 9.99912 20.1007 10.0818 20.031 10.1515Z"
            fill="#202020"
          />
        </svg>
      </SelectIcon>
    </SelectWrapper>
  );
};

export default Select;
