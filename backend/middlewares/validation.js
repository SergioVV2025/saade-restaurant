import validator from "validator";
import mongoose from "mongoose";

const reservationTimes = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

const validateReservationDate = (date) => {
  if (typeof date !== "string") {
    return "Invalid reservation date.";
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(date)) {
    return "Invalid reservation date.";
  }

  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    return "Invalid reservation date.";
  }

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(new Date())
    .reduce((parts, part) => {
      parts[part.type] = part.value;
      return parts;
    }, {});

  const minDate = `${today.year}-${today.month}-${today.day}`;

  const maxDateObject = new Date(`${minDate}T00:00:00Z`);

  maxDateObject.setUTCFullYear(maxDateObject.getUTCFullYear() + 1);

  const maxDate = maxDateObject.toISOString().slice(0, 10);

  if (date < minDate) {
    return "Reservation date cannot be in the past.";
  }

  if (date > maxDate) {
    return "Reservations cannot be made more than one year in advance.";
  }

  return "";
};

const validateSignup = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send({ message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: "Invalid email address." });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match." });
  }

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    return res.status(400).send({
      message: "Name must be between 2 and 30 characters.",
    });
  }

  next();
};

const validateSignin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: "Invalid email address." });
  }

  next();
};

function validateReservationId(req, res, next) {
  const { reservationId } = req.params;

  if (!mongoose.isValidObjectId(reservationId)) {
    return res.status(400).send({ message: "Invalid reservation ID." });
  }

  next();
}

const validateReservation = (req, res, next) => {
  const { name, email, phone, date, time, guests } = req.body;

  if (!name || !email || !phone || !date || !time || guests === undefined) {
    return res.status(400).send({
      message: "All reservation fields are required.",
    });
  }

  if (!validator.isLength(name, { min: 2, max: 40 })) {
    return res.status(400).send({
      message: "Name must be between 2 and 40 characters.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email address.",
    });
  }

  const dateError = validateReservationDate(date);

  if (dateError) {
    return res.status(400).send({
      message: dateError,
    });
  }

  if (!reservationTimes.includes(time)) {
    return res.status(400).send({
      message: "Invalid reservation time.",
    });
  }

  const guestsNumber = Number(guests);

  if (
    !Number.isInteger(guestsNumber) ||
    guestsNumber < 1 ||
    guestsNumber > 20
  ) {
    return res.status(400).send({
      message: "Number of guests must be between 1 and 20.",
    });
  }

  next();
};

const validateReservationUpdate = (req, res, next) => {
  const { name, email, date, time, guests } = req.body;

  if (name !== undefined && !validator.isLength(name, { min: 2, max: 40 })) {
    return res.status(400).send({
      message: "El nombre debe tener entre 2 y 40 caracteres.",
    });
  }

  if (email !== undefined && !validator.isEmail(email)) {
    return res.status(400).send({
      message: "Correo electrónico inválido!",
    });
  }

  if (date !== undefined) {
    const dateError = validateReservationDate(date);

    if (dateError) {
      return res.status(400).send({
        message: dateError,
      });
    }
  }

  if (time !== undefined && !reservationTimes.includes(time)) {
    return res.status(400).send({
      message: "El horario seleccionado no es válido.",
    });
  }

  if (guests !== undefined) {
    const guestsNumber = Number(guests);

    if (
      !Number.isInteger(guestsNumber) ||
      guestsNumber < 1 ||
      guestsNumber > 20
    ) {
      return res.status(400).send({
        message: "El número de personas debe estar entre 1 y 20.",
      });
    }
  }
  next();
};

export {
  validateSignup,
  validateSignin,
  validateReservationId,
  validateReservation,
  validateReservationUpdate,
};
