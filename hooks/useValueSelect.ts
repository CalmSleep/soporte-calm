import {
  IDataSendNotion,
  IInfoForm,
} from "@/components/Organisms/Steps/Step4/types";
import { infoString } from "@/components/Organisms/Steps/util";
import { useState } from "react";

const useValueSelect = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [confirmedValue, setConfirmedValue] = useState<string | null>(null);
  const [checkSeleccionado, setCheckSeleccionado] = useState(false);
  const [checkboxConfirmed, setCheckboxConfirmed] = useState(false);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [notionInfo, setNotionInfo] = useState<IInfoForm>({
    problemDescription: [],
    productChange: [],
    productReturn: [],
  });

  const handleOnchangeButton = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleOnchangeWithoutConfirm = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
    setConfirmedValue(selectedValue);
    setCheckSeleccionado(false);
    setSelectedTitles([]);
  };

  const handleConfirm = () => {
    if (selectedValue !== null) {
      setConfirmedValue(selectedValue);
      const info = infoString(selectedValue);
      setNotionInfo((prev) => ({
        ...prev,
        userIntention: info,
      }));
    }
  };

  const handleCheckboxChange = (isChecked: boolean, title: string) => {
    setSelectedTitles((prevTitles) => {
      const cleanedTitles = prevTitles.filter(
        (t) => !t.startsWith(title.split(" (")[0])
      );

      const updatedTitles = isChecked
        ? [...cleanedTitles, title]
        : cleanedTitles;

      // Si no queda ninguno, se setea false
      setCheckSeleccionado(updatedTitles.length > 0);

      return updatedTitles;
    });
  };

  const handleCheckboxChangeConfirmed = (
    isChecked: boolean,
    title: string,
    radioGroup: string[]
  ) => {
    setCheckSeleccionado(isChecked);

    setSelectedTitles((prev) => {
      const filtered = prev.filter(
        (t) =>
          !radioGroup.includes(t) &&
          t !== "Transferencia con hasta 25% OFF" &&
          t !== "Tarjeta de debito" &&
          t !== "Tarjeta de crédito en hasta 12 csi"
      );

      if (isChecked) {
        return [...filtered, title];
      } else {
        return filtered;
      }
    });
  };

  const handlePaymentChange = (
    paymentLabel: string,
    payments: { value: string; label: string }[]
  ) => {
    setSelectedTitles((prevTitles) => {
      const baseTitle = "Quiero comprarlo con un 5% de descuento";

      const filtered = prevTitles.filter(
        (title) => !payments.some((p) => p.label === title)
      );

      // Aseguramos que esté el título base
      const updated = filtered.includes(baseTitle)
        ? filtered
        : [...filtered, baseTitle];

      return [...updated, paymentLabel];
    });
  };

  const handleConfirmCheckbox = () => {
    setCheckboxConfirmed(checkSeleccionado);
  };

  const handleEditCheckbox = () => {
    setSelectedValue(null);
    setCheckSeleccionado(false);
    setCheckboxConfirmed(false);
    setSelectedTitles([]);
  };

  return {
    selectedValue,
    confirmedValue,
    checkSeleccionado,
    checkboxConfirmed,
    selectedTitles,
    notionInfo,
    setNotionInfo,
    setCheckSeleccionado,
    setCheckboxConfirmed,
    setSelectedTitles,
    setSelectedValue,
    handleOnchangeButton,
    handleOnchangeWithoutConfirm,
    handleConfirm,
    setConfirmedValue,
    handleCheckboxChange,
    handleConfirmCheckbox,
    handleEditCheckbox,
    handleCheckboxChangeConfirmed,
    handlePaymentChange,
  };
};

export default useValueSelect;
