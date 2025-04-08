import { useState } from "react";

const useValueSelect = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [confirmedValue, setConfirmedValue] = useState<string | null>(null);
  const [checkSeleccionado, setCheckSeleccionado] = useState(false);
  const [checkboxConfirmed, setCheckboxConfirmed] = useState(false);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

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
    setConfirmedValue(selectedValue);
  };

  const handleCheckboxChange = (isChecked: boolean, title: string) => {
    setCheckSeleccionado(isChecked);

    setSelectedTitles((prevTitles) => {
      const cleanedTitles = prevTitles.filter(
        (t) => !t.startsWith(title.split(" (")[0])
      );

      if (isChecked) {
        return [...cleanedTitles, title];
      } else {
        return cleanedTitles;
      }
    });
  };

  const handleCheckboxChangeConfirmed = (isChecked: boolean, title: string) => {
    setCheckSeleccionado(isChecked);

    setSelectedTitles((prev) => {
      if (isChecked) {
        // Agregamos el título si no está
        return prev.includes(title) ? prev : [...prev, title];
      } else {
        // Si se desmarca, lo sacamos y también sacamos cualquier pago
        return prev.filter(
          (t) =>
            t !== title &&
            t !== "Transferencia con hasta 25% OFF" &&
            t !== "Tarjeta de debito" &&
            t !== "Tarjeta de crédito en hasta 12 csi"
        );
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
