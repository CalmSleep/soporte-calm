import { DniInput, ErrorInput } from "./types";

export const validateDni = (dni: DniInput): ErrorInput => {
  const errors: ErrorInput = {};
  if (!dni.dni) {
    errors.dni = "Ingresá tu dni sin puntos ni espacios";
  }

  if (dni.dni) {
    if (dni.dni.toString().length !== 8) {
      errors.dni = "El DNI debe tener 8 dígitos";
    }
  }

  return errors;
};
