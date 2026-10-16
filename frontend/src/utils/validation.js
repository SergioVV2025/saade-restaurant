import { reservationTimes } from "./reservationConstants";

export function validateText({ value, fieldName, minLength, maxLength }) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${fieldName} es obligatorio.`;
  }

  if (trimmedValue.length < minLength) {
    return `${fieldName} debe tener al menos ${minLength} caracteres.`;
  }

  if (trimmedValue.length > maxLength) {
    return `${fieldName} no puede tener más de ${maxLength} caracteres.`;
  }

  return "";
}

export function validateEmail(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "El email es obligatorio.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(trimmedValue)) {
    return "Introduce un email válido.";
  }

  return "";
}

export function validateReservationDate(value) {
  if (!value) {
    return "La fecha es obligatoria.";
  }

  const today = new Date();

  const maxReservationDate = new Date();
  maxReservationDate.setFullYear(today.getFullYear() + 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const minDate = formatDate(today);
  const maxDate = formatDate(maxReservationDate);

  if (value < minDate) {
    return "La fecha no puede ser anterior a hoy.";
  }

  if (value > maxDate) {
    return "La reserva no puede hacerse con más de un año de anticipación.";
  }

  return "";
}

export function validateForm(formData) {
  const errors = {
    name: validateText({
      value: formData.name,
      fieldName: "Nombre",
      minLength: 2,
      maxLength: 40,
    }),

    email: validateEmail(formData.email),

    phone: formData.phone.trim() ? "" : "El teléfono es obligatorio.",

    date: validateReservationDate(formData.date),

    time: !formData.time
      ? "La hora es obligatoria."
      : !reservationTimes.includes(formData.time)
        ? "Selecciona un horario válido."
        : "",

    guests: !formData.guests
      ? "Indica el número de personas."
      : Number(formData.guests) < 1 || Number(formData.guests) > 20
        ? "El número de personas debe estar entre 1 y 20."
        : "",
  };

  return errors;
}

export function validateReservationUpdate({ date, time, guests }) {
  const errors = {
    date: validateReservationDate(date),

    time: !time
      ? "La hora es obligatoria."
      : !reservationTimes.includes(time)
        ? "Selecciona un horario válido."
        : "",

    guests:
      Number(guests) < 1 || Number(guests) > 20
        ? "El número de personas debe estar entre 1 y 20."
        : "",
  };

  return errors;
}
