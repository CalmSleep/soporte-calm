import { quatityItemsProps } from "./Step3/types";
import {
  selectedTitleOthers,
  splitDevolucion,
  splitQuieroComprar,
} from "./util";

export const infoStringStep2 = (confirmedValue: string) => {
  return confirmedValue === "1"
    ? "Tuve un problema con el o los productos que recibí."
    : confirmedValue === "2"
    ? "Quiero devolver el producto"
    : confirmedValue === "3"
    ? "Quiero cambiar el producto"
    : "";
};

export const infoTitleStep3 = (valueSelect: string) => {
  return valueSelect === "1"
    ? "Contanos cuál fue el problema"
    : valueSelect === "2"
    ? "Contanos qué productos querés devolver"
    : valueSelect === "3"
    ? "Contanos qué productos querés cambiar"
    : "";
};

export const infoParagraphStep3 = (valueSelect: string) => {
  return valueSelect === "1"
    ? "Si no encontrás tu caso en estas opciones, escribinos y te ayudamos."
    : valueSelect === "2"
    ? "¿Necesitas devolver uno o más productos? ¡No hay problema! Avancemos con la gestión..."
    : "¿Necesitas cambiar uno o más productos? ¡No hay problema! Avancemos con la gestión...";
};

export const titlesProducts = (quatityItems: quatityItemsProps[]) => {
  return quatityItems.map(({ title, quantity }) =>
    quantity > 1 && title.includes("-")
      ? `${title.split("-")[0]}x ${quantity} -${title.split("-")[1]}`
      : quantity > 1
      ? `${title} x${quantity}`
      : title
  );
};

export const infoSelect1 = (
  valueSelect: string,
  selectedValue: string,
  quatityItems: quatityItemsProps[],
  selectedTitles: string[],
  optionStep3: { value: string; label: string }[]
) => {
  const [quieroComprar, otros] = splitQuieroComprar(selectedTitles);
  const infoProduct =
    (valueSelect === "1" && selectedValue === "1") ||
    selectedValue === "4" ||
    selectedValue === "3" ||
    valueSelect === "2" ||
    valueSelect === "3"
      ? `${selectedTitleOthers(titlesProducts(quatityItems)).join(", ")}`
      : valueSelect === "1" && selectedValue === "2" && quieroComprar.length
      ? `${quieroComprar}`
      : "";

  const infoMensaje =
    valueSelect === "1" && selectedValue === "2" && otros.length > 0
      ? `${otros.join(", ")}`
      : "";

  const infoSelect1 = [
    selectedTitles.some((title) => title.includes("cambio"))
      ? "cambio"
      : `${optionStep3.find((item) => item.value === selectedValue)?.label}` ||
        "cambio",
    infoProduct,
    infoMensaje,
  ];

  return infoSelect1;
};

export const infoSelect2And = (
  valueSelect: string,
  quatityItems: quatityItemsProps[],
  selectedTitles: string[]
) => {
  const [continuemos] = splitDevolucion(selectedTitles);
  const formattedTitles = titlesProducts(quatityItems)
    .filter((title) => title.includes("-"))
    .map((title) => {
      if (title.includes("-")) {
        const [before, after] = title.split(" - ");
        return `${before.trim()} (${after.trim()})`;
      }
      return title;
    });

  const products =
    valueSelect === "2"
      ? titlesProducts(quatityItems).join(", ")
      : `${titlesProducts(quatityItems)
          .filter((title) => !title.includes("-"))
          .join(", ")}`;

  const infoSelect2And3 = [
    products,
    valueSelect === "2"
      ? `${continuemos.join(", ")}`
      : formattedTitles.join(", "),
  ];

  return infoSelect2And3;
};

export const infoStep4 = (valueSelect: string, selectedValue: string) => {
  return valueSelect === "1" && selectedValue === "1"
    ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Solo necesitamos que nos mandes una foto de lo que recibiste, incluyendo todos los productos y piezas que venían en la caja.\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
    : valueSelect === "1" && selectedValue === "2"
    ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Adjuntanos las siguientes &&imágenes del producto que recibiste&& demás para poder avanzar:\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
    : valueSelect === "1" && selectedValue === "3"
    ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Adjuntanos las siguientes &&imágenes del producto que recibiste&& para poder avanzar:\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
    : valueSelect === "1" && selectedValue === "4"
    ? `Gracias por la información ¡Último paso!
            Adjuntanos las siguientes imágenes del producto:\n
            1. Frente
            2. Dorso
            3. Falla`
    : valueSelect === "2"
    ? `Gracias por la información ¡Continuamos!\n
            Adjuntanos las siguientes imágenes del producto a devolver:\n
            1. Frente
            2. Dorso\n
            ❗ Si el producto nunca salió de su caja, mandanos una foto donde se vea la cinta de seguridad.`
    : `Gracias por la información ¡Continuamos!\n
            Adjuntanos las siguientes imágenes del producto a cambiar:\n
            1. Frente
            2. Dorso\n
            ❗ Si el producto nunca salió de su caja, mandanos una foto donde se vea la cinta de seguridad.`;
};
