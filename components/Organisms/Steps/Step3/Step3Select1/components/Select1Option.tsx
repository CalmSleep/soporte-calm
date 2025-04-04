import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import AccordionUnit from "@/components/Molecules/AccordionUnit/AccordionUnit";
import FrequentQuestions from "@/components/Organisms/FrequentQuestions/FrequentQuestions";
import { DivAccordionUnit } from "@/components/Organisms/FrequentQuestions/styled";
import React, { act, useState } from "react";
import { SelectOptionProps } from "../types";
import useValueSelect from "@/hooks/useValueSelect";

const Select1Option = ({ onCheckboxChange }: SelectOptionProps) => {
  const checks = [
    {
      id: "1",
      value: "1",
      name: "almohada",
      title: "Alta almohada",
      span: "(65x35cm)",
    },
    {
      id: "2",
      value: "2",
      title: "Mesa ratona",
    },
  ];

  return (
    <>
      <Paragraph>Seleccioná el producto o las piezas faltantes:</Paragraph>
      {checks.map((check) => {
        return (
          <div key={check.id} className="flex">
            <Input
              width="16px"
              color="mangoTango"
              height="16px"
              type="checkbox"
              name={check.name}
              value={check.value}
              onChange={(e) => onCheckboxChange(e.target.checked, check.title)}
            />
            <Paragraph>{check.title}</Paragraph>
          </div>
        );
      })}
    </>
  );
};
// const items = [
//   {
//     id: "1",
//     title: "Mesa ratona",
// description: [
//   {
//     name: "mesa",
//     value: "",
//     description: "Falta este producto completo",
//   },
//   {
//     name: "mesa",
//     value: "",
//     description: "Falta una o más piezas",
//   },
// ],
//   },
//   {
//     id: "2",
//     title: "Mesa de arrime",
//   },
//   {
//     id: "3",
//     title: "Base de hierro",
//     description: [
//       {
//         name: "mesa",
//         value: "",
//         description: "Falta este producto completo",
//       },
//       {
//         name: "mesa",
//         value: "",
//         description: "Falta una o más piezas",
//         moreOption: ["Maderas", "Recuadros"],
//       },
//     ],
//   },
// ];
// const [activeItems, setActiveItems] = useState<string[]>([]);
// const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});

// // ✅ Función para manejar cambios en los checkboxes
// const handleCheckboxChange = (name: string) => {
//   setCheckboxes((prev) => {
//     const updated = { ...prev, [name]: !prev[name] };

//     // ✅ Avisar al padre si al menos un checkbox está seleccionado
//     const isAnyChecked = Object.values(updated).some((checked) => checked);
//     onCheckboxChange(isAnyChecked);

//     return updated;
//   });
// };

// const handleClick = (title: string) => {
//   setActiveItems((prev) =>
//     prev.includes(title)
//       ? prev.filter((item) => item !== title)
//       : [...prev, title]
//   );
// };
// return (
//   <>
//     <Paragraph>Seleccioná el producto o las piezas faltantes:</Paragraph>
// <div className="flex">
//   <Input
//     width="16px"
//     type="checkbox"
//     color="mangoTango"
//     height="16px"
//     onChange={() => handleCheckboxChange("almohada1")}
//   />
//   <Paragraph>Alta almohada (65x35cm)</Paragraph>
// </div>
//     <div className="flex">
//       <Input
//         width="16px"
//         type="checkbox"
//         color="mangoTango"
//         height="16px"
//         onChange={() => handleCheckboxChange("almohada2")}
//       />
//       <Paragraph>Alta almohada (65x35cm)</Paragraph>
//     </div>

//     {items &&
//       items.map((item, index) => {
//         let isActive = activeItems.includes(check.title);
//         return (
// <AccordionUnit
//   key={check.id}
//   onClick={() => handleClick(check.title)}
//   itemName={check.title}
//   itemsSelect={
//     check.description &&
//     Array.isArray(check.description) &&
//     check.description.map((item) => (
//       <>
//         <fieldset className="flex-2">
//           <label>
//             <input
//               type="radio"
//               name={check.name}
//               value={check.value}
//               onChange={() => handleCheckboxChange(check.name)}
//             />
//             {check.description}
//           </label>
//         </fieldset>
//         {check.moreOption &&
//           check.moreOption.map((item) => (
//             <div className="flex">
//               <Input
//                 width="16px"
//                 type="checkbox"
//                 color="mangoTango"
//                 height="16px"
//               />
//               <Paragraph>{item}</Paragraph>
//             </div>
//           ))}
//       </>
//     ))
//   }
//   isActive={isActive}
//   isLastUnit={index === items.length - 1}
// />
//         );
//       })}
//     <div className="flex">
//       <Input
//         width="16px"
//         type="checkbox"
//         color="mangoTango"
//         height="16px"
//         onChange={() => handleCheckboxChange("colchon1")}
//       />
//       <Paragraph>Colchón Original Plus (140x190cm)</Paragraph>
//     </div>
//   </>
// );

export default Select1Option;
