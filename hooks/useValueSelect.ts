import { infoStringStep2 } from "@/components/Organisms/Steps/infoStep";
import {
  IDataSendNotion,
  IInfoForm,
} from "@/components/Organisms/Steps/Step4/types";
import { useEffect, useState } from "react";

const useValueSelect = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [confirmedValue, setConfirmedValue] = useState<string | null>(null);
  const [checkSeleccionado, setCheckSeleccionado] = useState(false);
  const [checkboxConfirmed, setCheckboxConfirmed] = useState(false);
  const [checkClickCount, setCheckClickCount] = useState<{
    [id: string]: number;
  }>({});
  const [skuChild, setSkuChild] = useState<{ [id: string]: string }>({});

  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [selectedTitleObjects, setSelectedTitleObjects] = useState<
    { title: string; checkId: string }[]
  >([]);
  const [notionInfo, setNotionInfo] = useState<IInfoForm>({
    problemDescription: [],
  });

  const [pendingTitleUpdate, setPendingTitleUpdate] = useState<{
    checkId: string;
    title: string;
    isChecked: boolean;
  } | null>(null);

  useEffect(() => {
    if (!pendingTitleUpdate) return;

    const { checkId, title, isChecked } = pendingTitleUpdate;
    const count = checkClickCount[checkId] || 0;

    const isValidTitle = title && title.trim() !== "";
    const isCheckedIdSequence =
      checkId.includes("-") && /\d+-\d+/.test(checkId);

    setSelectedTitleObjects((prevTitles) => {
      let cleanedTitles = prevTitles.filter(
        (t) => t.checkId !== checkId && t.title && t.title.trim() !== ""
      );

      if (!isChecked && !isCheckedIdSequence && count > 0) {
        const existing = prevTitles.find((t) => t.checkId === checkId);
        if (existing) cleanedTitles.push(existing);
      }

      const shouldAdd =
        isChecked &&
        isValidTitle &&
        (isCheckedIdSequence || !checkId.includes("-"));

      const updatedTitles = shouldAdd
        ? [...cleanedTitles, { checkId, title }]
        : cleanedTitles;

      setCheckSeleccionado(updatedTitles.length > 0);

      return updatedTitles;
    });

    setPendingTitleUpdate(null);
  }, [checkClickCount, pendingTitleUpdate]);

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
    setCheckClickCount({});
    setSelectedTitleObjects([]);
    setSkuChild({});
  };

  const handleConfirm = () => {
    if (selectedValue !== null) {
      setConfirmedValue(selectedValue);
      const info = infoStringStep2(selectedValue);
      setNotionInfo((prev) => ({
        ...prev,
        userIntention: info,
      }));
    }
  };

  const handleCheckboxChange = (
    isChecked: boolean,
    title: string,
    checkId: string,
    quantity?: number,
    skuChild?: string
  ) => {
    if (!quantity) {
      setCheckClickCount((prev) => {
        const prevCount = prev[checkId] || 0;
        const hasDash = checkId.includes("-");

        if (isChecked) {
          if (hasDash && prev[checkId] !== undefined) {
            return prev;
          }

          return {
            ...prev,
            [checkId]: hasDash ? 1 : prevCount + 1,
          };
        } else {
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
    } else {
      setCheckClickCount((prev) => {
        return {
          ...prev,
          [checkId]: quantity,
        };
      });
    }

    if (!skuChild || title.trim() === "") {
      setSkuChild((prev) => {
        const newState = { ...prev };
        delete newState[checkId];
        return newState;
      });
    } else {
      setSkuChild((prev) => ({
        ...prev,
        [checkId]: skuChild,
      }));
    }
    setPendingTitleUpdate({ checkId, title, isChecked });
  };

  const handleCheckboxChangeConfirmed = (
    isChecked: boolean,
    title: string,
    checkId: string,
    radioGroup: string[]
  ) => {
    setCheckSeleccionado(isChecked);

    setCheckClickCount((prev) => {
      const prevCount = prev[checkId] || 0;
      const hasDash = checkId.includes("-");

      if (isChecked) {
        if (hasDash && prev[checkId] !== undefined) {
          return prev;
        }

        return {
          ...prev,
          [checkId]: hasDash ? 1 : prevCount + 1,
        };
      } else {
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
    setCheckClickCount({});
    setSelectedTitleObjects([]);
    setSkuChild({});
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
    skuChild,
    setSkuChild,
  };
};

export default useValueSelect;
