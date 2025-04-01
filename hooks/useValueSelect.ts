import { useState } from "react";

const useValueSelect = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [confirmedValue, setConfirmedValue] = useState<string | null>(null);

  const handleOnchangeButton = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleOnchangeWithoutConfirm = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
    setConfirmedValue(selectedValue);
  };

  const handleConfirm = () => {
    setConfirmedValue(selectedValue);
  };

  return {
    selectedValue,
    confirmedValue,
    handleOnchangeButton,
    handleOnchangeWithoutConfirm,
    handleConfirm,
    setConfirmedValue,
  };
};

export default useValueSelect;
