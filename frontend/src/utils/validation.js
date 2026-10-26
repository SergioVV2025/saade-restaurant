import { reservationTimes } from "./reservationConstants";

export function validateText({ value, fieldName, minLength, maxLength }) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${fieldName} is required.`;
  }

  if (trimmedValue.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long.`;
  }

  if (trimmedValue.length > maxLength) {
    return `${fieldName} cannot exceed ${maxLength} characters.`;
  }

  return "";
}

export function validateEmail(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Email is required.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(trimmedValue)) {
    return "Please enter a valid email address.";
  }

  return "";
}

export function validateReservationDate(value) {
  if (!value) {
    return "Date is required.";
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
    return "Date cannot be in the past.";
  }

  if (value > maxDate) {
    return "Reservations cannot be made more than one year in advance.";
  }

  return "";
}

export function validateForm(formData) {
  const errors = {
    name: validateText({
      value: formData.name,
      fieldName: "Name",
      minLength: 2,
      maxLength: 40,
    }),

    email: validateEmail(formData.email),

    phone: formData.phone.trim() ? "" : "Phone number is required.",

    date: validateReservationDate(formData.date),

    time: !formData.time
      ? "Time is required."
      : !reservationTimes.includes(formData.time)
        ? "Please select a valid time."
        : "",

    guests: !formData.guests
      ? "Please enter the number of guests."
      : Number(formData.guests) < 1 || Number(formData.guests) > 20
        ? "The number of guests must be between 1 and 20."
        : "",
  };

  return errors;
}

export function validateReservationUpdate({ date, time, guests }) {
  const errors = {
    date: validateReservationDate(date),

    time: !time
      ? "Time is required."
      : !reservationTimes.includes(time)
        ? "Please select a valid time."
        : "",

    guests:
      Number(guests) < 1 || Number(guests) > 20
        ? "The number of guests must be between 1 and 20."
        : "",
  };

  return errors;
}
