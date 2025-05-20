import {
  IDataSendNotion,
  IInfoForm,
} from "@/components/Organisms/Steps/Step4/types";
import { infoString } from "@/components/Organisms/Steps/util";
import { useEffect, useState } from "react";

const useValueSelect = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [confirmedValue, setConfirmedValue] = useState<string | null>(null);
  const [checkSeleccionado, setCheckSeleccionado] = useState(false);
  const [checkboxConfirmed, setCheckboxConfirmed] = useState(false);
  const [checkClickCount, setCheckClickCount] = useState<{
    [id: string]: number;
  }>({});

  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [selectedTitleObjects, setSelectedTitleObjects] = useState<
    { title: string; checkId: string }[]
  >([]);
  const [notionInfo, setNotionInfo] = useState<IInfoForm>({
    problemDescription: [],
    productChange: [],
    productReturn: [],
  });
  const [idVariation, setIdVariation] = useState<number[]>([]);
  const [idVariationChange, setIdVariationChange] = useState<number[]>([]);

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
    setIdVariation([]);
    setIdVariationChange([]);
    setCheckClickCount({});
    setSelectedTitleObjects([]);
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

  const handleCheckboxChange = (
    isChecked: boolean,
    title: string,
    checkId: string
  ) => {
    console.log("checkId", checkId);
    //   console.log("checkClickCount", checkClickCount);

    setCheckClickCount((prev) => {
      const prevCount = prev[checkId] || 0;
      const hasDash = checkId.includes("-");

      if (isChecked) {
        // Si tiene guion y ya existe ese ID exacto, no hacer nada
        if (hasDash && prev[checkId] !== undefined) {
          return prev;
        }

        // Sino, agregar normalmente (ya sea sin guion o con guion nuevo)
        return {
          ...prev,
          [checkId]: hasDash ? 1 : prevCount + 1,
        };
      } else {
        // Deselección: restar 1 y eliminar si llega a 0
        const newCount = Math.max(prevCount - 1, 0);
        const { [checkId]: _, ...rest } = prev;

        if (newCount === 0) {
          return Object.keys(rest).length === 0 ? {} : rest;
        }

        return {
          ...rest,
          [checkId]: newCount,
        };
      }
    });

    setSelectedTitleObjects((prevTitles) => {
      // Remover solo el título con el mismo checkId (solo ese reemplazamos)
      const cleanedTitles = prevTitles.filter((t) => t.checkId !== checkId);

      // Si está seleccionado, agregar nuevo objeto, sino solo devolver limpio
      const updatedTitles = isChecked
        ? [...cleanedTitles, { checkId, title }]
        : cleanedTitles;

      setCheckSeleccionado(updatedTitles.length > 0);

      return updatedTitles;
    });

    // setSelectedTitles((prevTitles) => {
    //   const cleanedTitles = prevTitles.filter(
    //     (t) => !t.startsWith(title.split(" (")[0])
    //   );

    //   const updatedTitles = isChecked
    //     ? [...cleanedTitles, title]
    //     : cleanedTitles;

    //   // Si no queda ninguno, se setea false
    //   setCheckSeleccionado(updatedTitles.length > 0);

    //   return updatedTitles;
    // });
  };

  const handleCheckboxChangeConfirmed = (
    isChecked: boolean,
    title: string,
    checkId: string,
    radioGroup: string[]
  ) => {
    // console.log("checkId", checkId);

    setCheckSeleccionado(isChecked);

    setCheckClickCount((prev) => {
      const prevCount = prev[checkId] || 0;
      const hasDash = checkId.includes("-");

      if (isChecked) {
        // Si tiene guion y ya existe ese ID exacto, no hacer nada
        if (hasDash && prev[checkId] !== undefined) {
          return prev;
        }

        // Sino, agregar normalmente (ya sea sin guion o con guion nuevo)
        return {
          ...prev,
          [checkId]: hasDash ? 1 : prevCount + 1,
        };
      } else {
        // Deselección: restar 1 y eliminar si llega a 0
        const newCount = Math.max(prevCount - 1, 0);
        const { [checkId]: _, ...rest } = prev;

        if (newCount === 0) {
          return Object.keys(rest).length === 0 ? {} : rest;
        }

        return {
          ...rest,
          [checkId]: newCount,
        };
      }
    });

    setSelectedTitles((prev) => {
      const filtered = prev.filter(
        (t) =>
          !radioGroup.includes(t) &&
          t !== "Transferencia con hasta 25% OFF" &&
          t !== "Tarjeta de debito" &&
          t !== "Tarjeta de crédito en hasta 12 csi"
      );

      return isChecked ? [...filtered, title] : filtered;
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
    setIdVariation([]);
    setIdVariationChange([]);
    setCheckClickCount({});
    setSelectedTitleObjects([]);
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
    selectedTitleObjects,
    setSelectedTitleObjects,
    checkClickCount,
    handleOnchangeButton,
    handleOnchangeWithoutConfirm,
    handleConfirm,
    setConfirmedValue,
    handleCheckboxChange,
    handleConfirmCheckbox,
    handleEditCheckbox,
    handleCheckboxChangeConfirmed,
    handlePaymentChange,
    idVariation,
    setIdVariation,
    idVariationChange,
    setIdVariationChange,
  };
};

export default useValueSelect;
