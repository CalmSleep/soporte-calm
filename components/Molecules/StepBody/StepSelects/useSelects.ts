import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IItems, StepSelectsProps } from "./types";
import { IChildrenProd } from "@/state/products/types";
import { ShelfData } from "@/components/Organisms/ShelfConfigurator/types";

const useSelects = ({
  onCheckboxChange,
  items,
  radioOptions,
  selectedOption,
  selectedTitle,
  setSelectedOption,
}: StepSelectsProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>(
    []
  );
  const [selectedChild, setSelectedChild] = useState<{
    [id: string]: IChildrenProd | null;
  }>({});
  const [selectedChildChecked, setSelectedChildChecked] = useState(false);
  const [idChild, setIdChild] = useState<string | null>(null);
  const [shelfConfigurations, setShelfConfigurations] = useState<ShelfData[]>(
    []
  );
  const [selectedGroup, setSelectedGroup] = useState<
    IChildrenProd[] | undefined
  >();
  const [quantityOpen, setQuantityOpen] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [isQuatity, setIsQuatity] = useState<{ [id: string]: number }>({});
  const [isSizechange, setIsSizeChange] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [isColorchange, setIsColorChange] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [isShelfConfigChanged, setIsShelfConfigChanged] = useState(false);

  useEffect(() => {
    const child = selectedChild[idChild || ""];

    const newTitle = child?.name;

    if (idChild !== null) {
      onCheckboxChange?.(
        true,
        newTitle || "",
        idChild.toString(),
        [],
        isQuatity[idChild],
        child?.sku || ""
      );
    }
  }, [
    selectedChild[idChild || ""],
    shelfConfigurations,
    selectedChildChecked,
    idChild,
    isQuatity,
  ]);

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

  const handlePieceCheckboxChange = (uniqueKey: string, pieceLabel: string) => {
    const baseId = Number(uniqueKey.split("-")[0]);

    const currentCheckedPieces = selectedChecks[uniqueKey] || [];
    const isAlreadyChecked = currentCheckedPieces.includes(pieceLabel);

    const updatedCheckedPieces = isAlreadyChecked
      ? currentCheckedPieces.filter((p) => p !== pieceLabel)
      : [...currentCheckedPieces, pieceLabel];

    setSelectedChecks((prev) => ({
      ...prev,
      [uniqueKey]: updatedCheckedPieces,
    }));

    const itemFromItems = items && items.find((i) => Number(i.id) === baseId);
    const piece = itemFromItems?.pieces.find((p) => p.label === pieceLabel);

    if (isAlreadyChecked && piece?.hasInput) {
      setInputValues((prev) => {
        const inputsForUniqueKey = { ...(prev[uniqueKey] || {}) };
        delete inputsForUniqueKey[pieceLabel];

        if (Object.keys(inputsForUniqueKey).length === 0) {
          const { [uniqueKey]: _, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [uniqueKey]: inputsForUniqueKey,
        };
      });
    }

    const itemTitle = itemFromItems?.title || "";

    const inputsForUniqueKey = inputValues[uniqueKey] || {};

    const formattedTitle = updatedCheckedPieces.length
      ? `${itemTitle} (${updatedCheckedPieces
          .map(
            (piece) =>
              piece +
              (inputsForUniqueKey[piece]
                ? ` x${inputsForUniqueKey[piece]}`
                : "")
          )
          .join(", ")})`
      : itemTitle;

    onCheckboxChange &&
      onCheckboxChange(
        updatedCheckedPieces.length > 0,
        formattedTitle,
        uniqueKey
      );
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
    const baseId = Number(itemId.split("-")[0]);

    const itemTitle =
      (items && items.find((i) => Number(i.id) === baseId)?.title) || "";

    const formatted = checkedPieces.length
      ? `${itemTitle} (${checkedPieces
          .map((p) => `${p}${updatedValues[p] ? ` x ${updatedValues[p]}` : ""}`)
          .join(" , ")})`
      : itemTitle;

    onCheckboxChange &&
      onCheckboxChange(checkedPieces.length > 0, formatted, itemId);
  };

  const handlePieceRadioChange = (itemId: string, pieceLabel: string) => {
    const baseId = Number(itemId.split("-")[0]);
    const previous = selectedRadios[itemId];
    const item = items && items.find((i) => Number(i.id) === baseId);
    const itemTitle = item?.title || "";
    const inputsForItem = inputValues[itemId] || {};

    if (previous && previous !== pieceLabel) {
      const previousPiece = item?.pieces.find((p) => p.label === previous);

      if (previousPiece?.hasInput) {
        setInputValues((prev) => {
          const updatedInputs = { ...prev[itemId] };
          delete updatedInputs[previous];
          return {
            ...prev,
            [itemId]: updatedInputs,
          };
        });
      }
    }

    setSelectedRadios((prev) => ({
      ...prev,
      [itemId]: pieceLabel,
    }));

    const labelWithInput = `${pieceLabel}${
      inputsForItem[pieceLabel] ? `x${inputsForItem[pieceLabel]}` : ""
    }`;

    const formatted = `${itemTitle} (${labelWithInput})`;

    onCheckboxChange?.(true, formatted, itemId, [pieceLabel]);
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
    const baseId = Number(itemId.split("-")[0]);

    const itemTitle =
      (items && items.find((i) => Number(i.id) === baseId)?.title) || "";
    const labelWithInput = `${pieceLabel}${value ? ` x ${value}` : ""}`;
    const formatted = `${itemTitle} (${labelWithInput})`;

    onCheckboxChange?.(true, formatted, itemId, [pieceLabel]);
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
    //selectedChild,
    isColorchange,
    isSizechange,
    quantityOpen,
    selectedProductNames,
    selectedGroup,
  ]);

  const handleChangeRadio = (item: IItems, value: string) => {
    setSelectedRadios((prev) => ({
      ...prev,
      [item.id]: value,
    }));

    onCheckboxChange && onCheckboxChange(true, item.title, item.id);
  };

  const handleInternalRadioChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelectedOption && setSelectedOption(value);
    const selected = radioOptions?.find((opt) => opt.value === value);
    if (selected && onCheckboxChange) {
      onCheckboxChange(true, selected.label, selected.value);
    }
  };

  const handleProductCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productName: string,
    productId: string
  ) => {
    const isChecked = e.target.checked;
    setSelectedChildChecked(isChecked);
    setIdChild(productId);
    setSelectedChild((prev) => {
      const newChild = { ...prev };
      if (isChecked) {
        newChild[productId] = null;
      } else {
        delete newChild[productId];
      }
      return newChild;
    });

    setSelectedProductNames((prev) => {
      const cleanedProductNames = prev.filter(
        (n) => !n.startsWith(productName.split(" (")[0])
      );

      const updatedProductNames = isChecked
        ? [...cleanedProductNames, productName]
        : cleanedProductNames;

      return updatedProductNames;
    });

    onCheckboxChange && onCheckboxChange(isChecked, productName, productId, []);
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
    shelfConfigurations,
    setShelfConfigurations,
    isShelfConfigChanged,
    setIsShelfConfigChanged,
    setIsColorChange,
    handleCheckboxArrayChange,
    selectedGroup,
    setSelectedGroup,
    quantityOpen,
    setQuantityOpen,
    isQuatity,
    setIsQuatity,
  };
};

export default useSelects;
