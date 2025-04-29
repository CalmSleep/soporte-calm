import { useLayoutEffect, useRef, useState } from "react";
import { IItems, StepSelectsProps } from "./types";
import { set } from "date-fns";

const useSelects = ({
  onCheckboxChange,
  items,
  radioOptions,
  selectedOption,
  setSelectedOption,
}: StepSelectsProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleAccordionClick = (id: string) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };
  const [selectedRadios, setSelectedRadios] = useState<{
    [id: string]: string;
  }>({});

  const [selectedChecks, setSelectedChecks] = useState<{
    [itemId: string]: string[];
  }>({});
  const [inputValues, setInputValues] = useState<{
    [itemId: string]: { [pieceLabel: string]: string };
  }>({});

  const handlePieceCheckboxChange = (itemId: string, pieceLabel: string) => {
    const current = selectedChecks[itemId] || [];
    const alreadyChecked = current.includes(pieceLabel);
    const updated = alreadyChecked
      ? current.filter((p) => p !== pieceLabel)
      : [...current, pieceLabel];

    setSelectedChecks((prev) => ({
      ...prev,
      [itemId]: updated,
    }));

    const itemTitle =
      (items && items.find((i) => i.id === itemId)?.title) || "";
    const inputsForItem = inputValues[itemId] || {};

    const formatted = updated.length
      ? `${itemTitle} (${updated
          .map((p) => `${p}${inputsForItem[p] ? `x${inputsForItem[p]}` : ""}`)
          .join(", ")})`
      : itemTitle;

    onCheckboxChange && onCheckboxChange(updated.length > 0, formatted);
  };

  const handleInputChange = (
    itemId: string,
    pieceLabel: string,
    value: string
  ) => {
    setInputValues((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [pieceLabel]: value,
      },
    }));

    const checkedPieces = selectedChecks[itemId] || [];
    const updatedValues = {
      ...(inputValues[itemId] || {}),
      [pieceLabel]: value,
    };

    const itemTitle =
      (items && items.find((i) => i.id === itemId)?.title) || "";

    const formatted = checkedPieces.length
      ? `${itemTitle} (${checkedPieces
          .map((p) => `${p}${updatedValues[p] ? ` x ${updatedValues[p]}` : ""}`)
          .join(" , ")})`
      : itemTitle;

    onCheckboxChange && onCheckboxChange(checkedPieces.length > 0, formatted);
  };

  const handlePieceRadioChange = (itemId: string, pieceLabel: string) => {
    // Setea la selección única
    setSelectedRadios((prev) => ({
      ...prev,
      [itemId]: pieceLabel,
    }));

    const item = items && items.find((i) => i.id === itemId);
    const itemTitle = item?.title || "";

    const inputsForItem = inputValues[itemId] || {};
    const labelWithInput = `${pieceLabel}${
      inputsForItem[pieceLabel] ? `x${inputsForItem[pieceLabel]}` : ""
    }`;

    const formatted = `${itemTitle} (${labelWithInput})`;

    // Disparar callback al padre
    onCheckboxChange?.(true, formatted, [pieceLabel]);
  };

  const handleRadioInputChange = (
    itemId: string,
    pieceLabel: string,
    value: string
  ) => {
    setInputValues((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [pieceLabel]: value,
      },
    }));

    // Solo un radio seleccionado por grupo
    const itemTitle =
      (items && items.find((i) => i.id === itemId)?.title) || "";
    const labelWithInput = `${pieceLabel}${value ? ` x ${value}` : ""}`;
    const formatted = `${itemTitle} (${labelWithInput})`;

    onCheckboxChange?.(true, formatted, [pieceLabel]);
  };

  const contentRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  const [contentHeights, setContentHeights] = useState<{
    [id: string]: number;
  }>({});

  useLayoutEffect(() => {
    if (activeItem && contentRefs.current[activeItem]) {
      const scrollHeight = contentRefs.current[activeItem]!.scrollHeight;
      setContentHeights((prev) => ({ ...prev, [activeItem]: scrollHeight }));
    }
  }, [activeItem, selectedRadios, selectedChecks, inputValues]);

  const handleChangeRadio = (item: IItems, value: string) => {
    setSelectedRadios((prev) => ({
      ...prev,
      [item.id]: value,
    }));

    if (value === "completo") {
      onCheckboxChange && onCheckboxChange(true, item.title);
    } else if (value === "piezas") {
      onCheckboxChange && onCheckboxChange(false, item.title);
    }
  };

  const handleInternalRadioChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelectedOption && setSelectedOption(value);
    const selected = radioOptions?.find((opt) => opt.value === value);
    if (selected && onCheckboxChange) {
      onCheckboxChange(true, selected.label);
    }
  };

  return {
    activeItem,
    handleAccordionClick,
    selectedRadios,
    handleChangeRadio,
    selectedChecks,
    handlePieceCheckboxChange,
    inputValues,
    handleInputChange,
    handlePieceRadioChange,
    handleRadioInputChange,
    contentRefs,
    contentHeights,
    handleInternalRadioChange,
  };
};

export default useSelects;
