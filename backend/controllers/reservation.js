import Reservation from "../models/reservation.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../errors/index.js";

const createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    const newReservation = await Reservation.create({
      name,
      email,
      phone,
      date,
      time,
      guests,
      ...(req.user?._id && { owner: req.user._id }),
    });

    res.status(201).json({
      name: newReservation.name,
      email: newReservation.email,
      phone: newReservation.phone,
      date: newReservation.date,
      time: newReservation.time,
      guests: newReservation.guests,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid reservation information."));
    }

    next(err);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ owner: req.user._id });

    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId,
    ).orFail();

    if (String(reservation.owner) !== String(req.user._id)) {
      throw new ForbiddenError(
        "You do not have permission to cancel this reservation.",
      );
    }

    await Reservation.findByIdAndDelete(req.params.reservationId).orFail();

    return res.status(200).json({
      message: "Reservation canceled successfully.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid reservation ID."));
    }

    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Reservation not found."));
    }

    next(err);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId,
    ).orFail();

    if (String(reservation.owner) !== String(req.user._id)) {
      throw new ForbiddenError(
        "You do not have permission to update this reservation.",
      );
    }

    const allowedUpdates = ["name", "email", "phone", "date", "time", "guests"];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.reservationId,
      updates,
      { new: true, runValidators: true },
    ).orFail();

    return res.status(200).json(updatedReservation);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid reservation ID."));
    }

    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid reservation information."));
    }

    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Reservation not found."));
    }

    next(err);
  }
};

export default {
  createReservation,
  getReservations,
  deleteReservation,
  updateReservation,
};
