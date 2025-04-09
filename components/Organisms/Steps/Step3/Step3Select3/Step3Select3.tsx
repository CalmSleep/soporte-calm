// import React, { useState } from "react";
// import { Step3Select2And3Props } from "../types";
// import items from "../refundItems.json";
// import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
// import Paragraph from "@/components/Atoms/Typography/Text";
// import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";

// const Step3Select3 = ({
//   checkboxConfirmed,
//   checkSeleccionado,
//   selectedTitles,
//   handleEditCheckbox,
//   handleCheckboxChange,
//   handleCheckboxChangeConfirmed,
// }: Step3Select2And3Props) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const itemsTest = [items[0], items[1]];
//   const radioOptions = [
//     { value: "cambio", label: "¡Vamos con cambio!" },
//     { value: "devolucion", label: "Continuemos con la devolución" },
//   ];
//   const paragraphArray = [
//     {
//       id: 1,
//       text: " Sabemos que encontrar el producto perfecto puede llevar tiempo, yqueremos ayudarte a que des con la mejor opción para vos. Parafacilitarte el cambio, te ofrecemos un 5% OFF en este nuevo producto.",
//     },
//     {
//       id: 2,
//       text: "🔍 En base a lo que buscás, creemos que [nombre del producto recomendado] puede ser una mejor alternativa.",
//       text2:
//         "📌 [Explicación de porqué es más adecuado: características, diferencias, beneficios]",
//     },
//     {
//       id: 3,
//       text: "Para facilitarte el cambio, te ofrecemos un 5% OFF en este nuevo producto.",
//     },
//   ];

//   return (
//     <>
//       {!checkboxConfirmed ? (
//         <>
//           <StepSelects
//             titleParagraph="Selecciona el o los productos que queres devolver:"
//             // items={items}
//             items={itemsTest}
//             onCheckboxChange={handleCheckboxChange}
//           />
//           {checkSeleccionado && (
//             <StepSelects
//               titleParagraph="¿Por qué producto te gustaría hacer el cambio?"
//               items={items}
//               onCheckboxChange={handleCheckboxChange}
//             />
//           )}
//         </>
//       ) : (
//         <StepInfo
//           info={[`${selectedTitles.join(", ")}`]}
//           onClick={() => {
//             handleEditCheckbox();
//             setSelectedOption("");
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Step3Select3;
import React from "react";

const Step3Select3 = () => {
  return <div>Step3Select3</div>;
};

export default Step3Select3;
