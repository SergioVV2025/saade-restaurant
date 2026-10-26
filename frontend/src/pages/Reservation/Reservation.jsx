import { useState } from "react";

import {
  validateText,
  validateEmail,
  validateForm,
} from "../../utils/validation";

import Popup from "../../components/Popup/Popup";
import { createReservation } from "../../utils/reservations.js";
import { reservationTimes } from "../../utils/reservationConstants";
import saadeStars from "../../assets/saade-stars.svg";

function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [reservationError, setReservationError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let error = "";

    if (name === "name") {
      error = validateText({
        value,
        fieldName: "Name",
        minLength: 2,
        maxLength: 40,
      });
    }

    if (name === "email") {
      error = validateEmail(value);
    }

    if (name === "phone" && !value.trim()) {
      error = "Phone number is required.";
    }

    if (name === "date" && !value) {
      error = "Date is required.";
    }

    if (name === "time" && !value) {
      error = "Time is required.";
    }

    if (name === "guests") {
      const guests = Number(value);

      if (!value) {
        error = "Please enter the number of guests.";
      } else if (guests < 1 || guests > 20) {
        error = "The number of guests must be between 1 and 20.";
      }
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm(formData);

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const token = localStorage.getItem("jwt");

    try {
      setReservationError("");
      setIsCreating(true);

      await createReservation(formData, token);

      setConfirmedReservation(formData);
      setIsConfirmationOpen(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
      });
    } catch (error) {
      setReservationError(error.message);
    } finally {
      setIsCreating(false);
    }
  }

  const formattedConfirmationDate = confirmedReservation?.date
    ? new Date(
        `${confirmedReservation.date.split("T")[0]}T00:00:00`,
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const today = new Date();

  const maxReservationDate = new Date();
  maxReservationDate.setFullYear(today.getFullYear() + 1);

  const minDate = formatDateForInput(today);
  const maxDate = formatDateForInput(maxReservationDate);

  return (
    <main className="reservation-page">
      <div className="reservation-page__layout">
        <section className="reservation-page__intro">
          <div className="reservation-page__eyebrow-group">
            <img
              className="reservation-page__stars"
              src={saadeStars}
              alt=""
              aria-hidden="true"
            />

            <p className="reservation-page__eyebrow">Come hang</p>
          </div>

          <h1 className="reservation-page__title">
            Reserve
            <br />
            your table.
          </h1>

          <p className="reservation-page__description">
            Pick a date, bring your people, we&apos;ll take care of the rest.
          </p>
        </section>

        <form className="reservation" onSubmit={handleSubmit} noValidate>
          <div className="reservation__field">
            <label className="reservation__label" htmlFor="name">
              Name
            </label>

            <input
              className={`reservation__input ${
                errors.name ? "reservation__input_error" : ""
              }`}
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />

            <span className="reservation__error">{errors.name}</span>
          </div>

          <div className="reservation__field">
            <label className="reservation__label" htmlFor="email">
              Email
            </label>

            <input
              className={`reservation__input ${
                errors.email ? "reservation__input_error" : ""
              }`}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
            />

            <span className="reservation__error">{errors.email}</span>
          </div>

          <div className="reservation__field">
            <label className="reservation__label" htmlFor="phone">
              Phone
            </label>

            <input
              className={`reservation__input ${
                errors.phone ? "reservation__input_error" : ""
              }`}
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
            />

            <span className="reservation__error">{errors.phone}</span>
          </div>

          <div className="reservation__field">
            <label className="reservation__label" htmlFor="date">
              Date
            </label>

            <input
              className={`reservation__input ${
                errors.date ? "reservation__input_error" : ""
              }`}
              id="date"
              name="date"
              type="date"
              min={minDate}
              max={maxDate}
              value={formData.date}
              onChange={handleChange}
              required
            />

            <span className="reservation__error">{errors.date}</span>
          </div>

          <div className="reservation__field">
            <label className="reservation__label" htmlFor="time">
              Time
            </label>

            <select
              className={`reservation__select ${
                errors.time ? "reservation__input_error" : ""
              }`}
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>

              {reservationTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <span className="reservation__error">{errors.time}</span>
          </div>

          <div className="reservation__field">
            <label className="reservation__label" htmlFor="guests">
              Number of guests
            </label>

            <input
              className={`reservation__input ${
                errors.guests ? "reservation__input_error" : ""
              }`}
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="20"
              onKeyDown={(e) => e.preventDefault()}
              value={formData.guests}
              onChange={handleChange}
              required
            />

            <span className="reservation__error">{errors.guests}</span>
          </div>

          <button
            className="reservation__button"
            type="submit"
            disabled={isCreating}
          >
            {isCreating ? "Booking..." : "Book a table"}
          </button>

          {reservationError && (
            <p className="reservation__error">{reservationError}</p>
          )}
        </form>
      </div>

      <Popup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <div className="confirmation-popup">
          <p className="confirmation-popup__eyebrow">YOUR TABLE IS READY</p>

          <h2 className="confirmation-popup__title">
            Reservation
            <br />
            confirmed!
          </h2>

          <p className="confirmation-popup__text">See you soon at Saade.</p>

          <div className="confirmation-popup__details">
            <div className="confirmation-popup__detail">
              <span className="confirmation-popup__label">Name</span>
              <span>{confirmedReservation?.name}</span>
            </div>

            <div className="confirmation-popup__detail">
              <span className="confirmation-popup__label">Date</span>
              <span>{formattedConfirmationDate}</span>
            </div>

            <div className="confirmation-popup__detail">
              <span className="confirmation-popup__label">Time</span>
              <span>{confirmedReservation?.time}</span>
            </div>

            <div className="confirmation-popup__detail">
              <span className="confirmation-popup__label">Guests</span>
              <span>{confirmedReservation?.guests}</span>
            </div>
          </div>

          <button
            className="confirmation-popup__button"
            type="button"
            onClick={() => setIsConfirmationOpen(false)}
          >
            Done
          </button>
        </div>
      </Popup>
    </main>
  );
}

export default Reservation;
