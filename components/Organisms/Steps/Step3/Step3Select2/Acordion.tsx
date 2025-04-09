import AccordionUnit from "@/components/Molecules/AccordionUnit/AccordionUnit";
import StepRadio from "@/components/Molecules/StepBody/StepRadio/StepRadio";
import { useState, useRef, useEffect } from "react";
import changesItems from "../changesItems.json";
import Paragraph from "@/components/Atoms/Typography/Text";

const AcordeonSelector = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  console.log(selectedLabels);

  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [contentHeights, setContentHeights] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const newHeights: { [key: number]: number } = {};
    Object.entries(contentRefs.current).forEach(([key, el]) => {
      if (el) newHeights[+key] = el.scrollHeight;
    });
    setContentHeights(newHeights);
  }, [changesItems]);

  const handleAccordionClick = (id: number) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };

  const handleRadioChange = (id: number, value: string, label: string) => {
    setSelectedOptions((prev) => ({ ...prev, [id]: value }));

    setSelectedLabels((prev) => {
      const filtered = prev.filter((l) => {
        const currentItem = changesItems.find((item) => item.id === id);
        return currentItem
          ? !currentItem.radioOption.some((opt) => opt.label === l)
          : true;
      });
      return [...filtered, label];
    });
  };

  return (
    <>
      <Paragraph fontSize="20px">
        ¿Por qué producto te gustaría hacer el cambio?
      </Paragraph>
      {changesItems.map((item) => (
        <AccordionUnit
          key={item.id}
          titleStyle={{
            font: "regular",
            fontSize: "16px",
            lineHeight: "-0.48px",
          }}
          itemName={item.title}
          onClick={() => handleAccordionClick(item.id)}
          isActive={activeItem === item.id}
          contentHeight={contentHeights[item.id] || 0}
          refContent={(el: HTMLDivElement | null) => {
            contentRefs.current[item.id] = el;
          }}
          itemsSelect={
            <StepRadio
              radioOptions={item.radioOption}
              name={`radio-${item.id}`}
              checked={selectedOptions[item.id] || ""}
              onChange={(event) => {
                const value = event.target.value;
                const selected = item.radioOption.find(
                  (opt) => opt.value === value
                );
                if (selected) handleRadioChange(item.id, value, selected.label);
              }}
            />
          }
        />
      ))}
    </>
  );
};

export default AcordeonSelector;
