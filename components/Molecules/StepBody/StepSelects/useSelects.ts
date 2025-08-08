import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IItems, StepSelectsProps } from "./types";
import { set } from "date-fns";
import { IChildrenProd } from "@/state/products/types";

const useSelects = ({
  onCheckboxChange,
  items,
  radioOptions,
  selectedOption,
  selectedTitle,
  setSelectedOption,
  idVariation,
  setIdVariation,
}: StepSelectsProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>(
    []
  );
  const [selectedChild, setSelectedChild] = useState<IChildrenProd>();
  const [selectedChildChecked, setSelectedChildChecked] = useState(false);

  useEffect(() => {
    if (!selectedChild || selectedChildChecked === null) return;

    const newTitle = selectedChild.name;
    const baseName = newTitle.split(" - ")[0];
    const newId = Number(selectedChild.id);

    const previousTitle =
      selectedTitle?.find((title) => title.startsWith(baseName)) || null;

    const matchedProduct = selectedProductNames.find((productName) =>
      productName.startsWith(baseName)
    );

    // ⬇️ 1. Lógica de nombres
    if (previousTitle && previousTitle !== newTitle && matchedProduct) {
      onCheckboxChange?.(false, previousTitle);
    }

    if (!matchedProduct) {
      onCheckboxChange?.(false, previousTitle || newTitle);
    }

    if (matchedProduct) {
      onCheckboxChange?.(true, newTitle);
    }

    // ⬇️ 2. Lógica de IDs
    if (setIdVariation) {
      setIdVariation((prev = []) => {
        // Si es deschequeado, quitamos el ID
        if (!selectedChildChecked) {
          return prev.filter((id) => id !== newId);
        }

        // Si ya existe ese ID exacto, no hacer nada
        if (prev.includes(newId)) {
          return prev;
        }

        // Buscar si hay otro ID en prev con el mismo baseName
        const conflictingId = selectedProductNames.reduce((acc, name, i) => {
          if (name.startsWith(baseName)) {
            const possibleId = prev[i];
            if (possibleId !== undefined && possibleId !== newId) {
              return possibleId;
            }
          }
          return acc;
        }, undefined as number | undefined);

        // Si hay conflicto, reemplazar
        if (conflictingId !== undefined) {
          return prev.map((id) => (id === conflictingId ? newId : id));
        }

        // Si no hay conflicto ni duplicado, agregar
        return [...prev, newId];
      });
    }
  }, [selectedChild, selectedProductNames, selectedChildChecked]);

  const [isSizechange, setIsSizeChange] = useState(false);
  const [isColorchange, setIsColorChange] = useState(false);
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

    setIdVariation &&
      setIdVariation((prev) => {
        const next = prev || [];
        return next.includes(Number(itemId)) ? next : [...next, Number(itemId)];
      });

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
      requestAnimationFrame(() => {
        const el = contentRefs.current[activeItem];
        const scrollHeight = el?.scrollHeight || 0;
        setContentHeights((prev) => ({
          ...prev,
          [activeItem]: scrollHeight,
        }));
      });
    }
  }, [
    activeItem,
    selectedRadios,
    selectedChecks,
    inputValues,
    selectedChild,
    isColorchange,
    isSizechange,
  ]);

  const handleChangeRadio = (item: IItems, value: string) => {
    setSelectedRadios((prev) => ({
      ...prev,
      [item.id]: value,
    }));
    setIdVariation &&
      setIdVariation((prev) => {
        const next = prev || [];
        return next.includes(Number(item.id))
          ? next
          : [...next, Number(item.id)];
      });

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

  const handleProductCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productName: string
  ) => {
    const isChecked = e.target.checked;
    setSelectedChildChecked(isChecked);

    setSelectedProductNames((prev) => {
      const cleanedProductNames = prev.filter(
        (n) => !n.startsWith(productName.split(" (")[0])
      );

      const updatedProductNames = isChecked
        ? [...cleanedProductNames, productName]
        : cleanedProductNames;

      return updatedProductNames;
    });
  };

  const handleCheckboxArrayChange = ({
    prev,
    isChecked,
    id,
  }: {
    prev: number[];
    isChecked: boolean;
    id: number;
  }) => {
    if (isChecked) {
      return prev.includes(id) ? prev : [...prev, id];
    } else {
      return prev.filter((item) => item !== id);
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
    handleProductCheckboxChange,
    selectedProductNames,
    selectedChild,
    setSelectedChild,
    isSizechange,
    setIsSizeChange,
    isColorchange,
    setIsColorChange,
    handleCheckboxArrayChange,
  };
};

export default useSelects;
