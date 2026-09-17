import express from "express";
const router = express.Router();

import controllers from "../controllers/reservation.js";

import {
  validateReservationId,
  validateReservation,
  validateReservationUpdate,
} from "../middlewares/validation.js";

import auth from "../middlewares/auth.js";

import optionalAuth from "../middlewares/optionalAuth.js";
// router.use(auth);

router.post(
  "/reservations",
  optionalAuth,
  validateReservation,
  controllers.createReservation,
);

router.get("/reservations", auth, controllers.getReservations);

router.delete(
  "/reservations/:reservationId",
  auth,
  validateReservationId,
  controllers.deleteReservation,
);

router.patch(
  "/reservations/:reservationId",
  auth,
  validateReservationId,
  validateReservationUpdate,
  controllers.updateReservation,
);

export default router;
