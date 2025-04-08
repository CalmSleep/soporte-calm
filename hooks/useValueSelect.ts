import { useState } from "react";

const useValueSelect = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [confirmedValue, setConfirmedValue] = useState<string | null>(null);
  const [checkSeleccionado, setCheckSeleccionado] = useState(false);
  const [checkboxConfirmed, setCheckboxConfirmed] = useState(false);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

  const handleOnchangeButton = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleOnchangeWithoutConfirm = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
    setConfirmedValue(selectedValue);
    setSelectedTitles([]);
  };

  const handleConfirm = () => {
    setConfirmedValue(selectedValue);
  };

  // const handleCheckboxChange = (isChecked: boolean, title: string) => {
  //   setCheckSeleccionado(isChecked);

  //   setSelectedTitles((prevTitles) => {
  //     const alreadyExists = prevTitles.includes(title);

  //     if (isChecked) {
  //       // Si ya estaba, no lo vuelvas a agregar
  //       if (alreadyExists) return prevTitles;
  //       return [...prevTitles, title];
  //     } else {
  //       // Si se desactiva, lo quitás
  //       return prevTitles.filter((t) => t !== title);
  //     }
  //   });
  // };
  const handleCheckboxChange = (isChecked: boolean, title: string) => {
    setCheckSeleccionado(isChecked);

    setSelectedTitles((prevTitles) => {
      const cleanedTitles = prevTitles.filter(
        (t) => !t.startsWith(title.split(" (")[0]) // borra todo lo que empiece con el mismo "Mesa ratona"
      );

      if (isChecked) {
        return [...cleanedTitles, title];
      } else {
        return cleanedTitles;
      }
    });
  };

  const handleClickAcordion = (title: string) => {
    setSelectedTitles((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
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
    handleClickAcordion,
  };
};

export default useValueSelect;
