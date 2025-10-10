const MSG = {
  required: (field) => `${field} es requerido.`,
  max: (field, max) => `${field} no puede tener más de ${max} caracteres.`,
  min: (field, min) => `${field} no puede tener más de ${min} caracteres.`,
  unique: (field) => `${field} ya está registrado en el sistema.`,
  numeric: (field) => `${field} debe contener solo números.`,
  int: (field) => `${field} debe ser un valor númerico entero.`,
  email: "Por favor ingresa un email válido.",
  alpha: (field) => `${field} debe ser un valor alfabético.`,
  decimal: (field) => `${field} debe ser un valor númerico decimal.`,
  date: (field) => `${field} debe ser una fecha válida.`
};

module.exports = MSG;