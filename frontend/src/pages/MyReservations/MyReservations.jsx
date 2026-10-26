import { useEffect, useState } from "react";
import { reservationTimes } from "../../utils/reservationConstants";
import { validateReservationUpdate } from "../../utils/validation";
import Popup from "../../components/Popup/Popup";
import "../../blocks/myReservations.css";
import saadeStars from "../../assets/saade-stars.svg";

import {
  getReservations,
  deleteReservation,
  updateReservation,
} from "../../utils/reservations";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingReservation, setEditingReservation] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editGuests, setEditGuests] = useState(2);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [editError, setEditError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormErrors, setEditFormErrors] = useState({
    date: "",
    time: "",
    guests: "",
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadReservations = async () => {
      const token = localStorage.getItem("jwt");

      try {
        setError("");

        const data = await getReservations(token);

        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadReservations();
  }, []);

  function closeDeletePopup() {
    setReservationToDelete(null);
    setDeleteError("");
  }

  async function handleDelete(reservationId) {
    const token = localStorage.getItem("jwt");

    try {
      setDeleteError("");
      setIsDeleting(true);

      await deleteReservation(reservationId, token);

      // setReservations((currentReservations) =>
      //   currentReservations.filter(
      //     (reservation) => reservation._id !== reservationId,
      //   ),
      // );

      setReservations((currentReservations) => {
        const remainingReservations = currentReservations.filter(
          (reservation) => {
            return reservation._id !== reservationId;
          },
        );

        return remainingReservations;
      });

      setReservationToDelete(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  function closeEditPopup() {
    setEditingReservation(null);

    setEditFormErrors({
      date: "",
      time: "",
      guests: "",
    });

    setEditError("");
  }

  async function handleUpdate() {
    const validationErrors = validateReservationUpdate({
      date: editDate,
      time: editTime,
      guests: editGuests,
    });

    setEditFormErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== "",
    );

    if (hasErrors) {
      return;
    }

    const token = localStorage.getItem("jwt");

    const updatedData = {
      date: editDate,
      time: editTime,
      guests: Number(editGuests),
    };

    try {
      setEditError("");
      setIsUpdating(true);

      const updatedReservation = await updateReservation(
        editingReservation._id,
        updatedData,
        token,
      );

      // console.log(updatedReservation);

      // setReservations((currentReservations) =>
      //   currentReservations.map((reservation) =>
      //     reservation._id === updatedReservation._id
      //       ? updatedReservation
      //       : reservation,
      //   ),
      // );

      setReservations((currentReservations) => {
        const newReservations = currentReservations.map((reservation) => {
          if (reservation._id === updatedReservation._id) {
            return updatedReservation;
          }

          return reservation;
        });

        return newReservations;
      });

      closeEditPopup();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <main className="my-reservations">
      <section className="my-reservations__intro">
        <div className="my-reservations__eyebrow-group">
          <img
            className="my-reservations__stars"
            src={saadeStars}
            alt=""
            aria-hidden="true"
          />

          <p className="my-reservations__eyebrow">YOUR TABLES</p>
        </div>

        <h1 className="my-reservations__title">
          My
          <br />
          Reservations
        </h1>

        <p className="my-reservations__description">
          View, edit, or cancel your upcoming visits to Saade.
        </p>
      </section>

      {isLoading && (
        <p className="my-reservations__status">Loading reservations...</p>
      )}

      {error && (
        <p className="my-reservations__status my-reservations__status_error">
          {error}
        </p>
      )}

      {!isLoading && !error && reservations.length === 0 && (
        <div className="my-reservations__empty">
          <p className="my-reservations__empty-title">
            You don't have any reservations yet.
          </p>

          <p className="my-reservations__empty-text">
            Once you book a table, your reservation will appear here.
          </p>
        </div>
      )}

      {!isLoading && !error && reservations.length > 0 && (
        <section className="my-reservations__list">
          {reservations.map((reservation, index) => {
            const reservationDate = new Date(
              `${reservation.date.split("T")[0]}T00:00:00`,
            );

            const formattedDate = reservationDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article className="reservation-card" key={reservation._id}>
                <div className="reservation-card__number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="reservation-card__content">
                  <p className="reservation-card__eyebrow">RESERVATION</p>

                  <h2 className="reservation-card__name">{reservation.name}</h2>

                  <div className="reservation-card__details">
                    <div className="reservation-card__detail">
                      <span className="reservation-card__label">Date</span>

                      <span>{formattedDate}</span>
                    </div>

                    <div className="reservation-card__detail">
                      <span className="reservation-card__label">Time</span>

                      <span>{reservation.time}</span>
                    </div>

                    <div className="reservation-card__detail">
                      <span className="reservation-card__label">Guests</span>

                      <span>{reservation.guests}</span>
                    </div>
                  </div>
                </div>

                <div className="reservation-card__actions">
                  <button
                    className="reservation-card__button reservation-card__button_edit"
                    type="button"
                    onClick={() => {
                      setEditError("");
                      setEditingReservation(reservation);
                      setEditDate(reservation.date.split("T")[0]);
                      setEditTime(reservation.time);
                      setEditGuests(reservation.guests);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="reservation-card__button reservation-card__button_cancel"
                    type="button"
                    onClick={() => {
                      setDeleteError("");
                      setReservationToDelete(reservation);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
      <Popup isOpen={reservationToDelete !== null} onClose={closeDeletePopup}>
        <div className="delete-popup">
          <p className="delete-popup__eyebrow">ARE YOU SURE?</p>

          <h2 className="delete-popup__title">
            Cancel
            <br />
            reservation
          </h2>

          <p className="delete-popup__text">
            This action will delete your reservation.
            <br />
            Do you want to continue?
          </p>

          <div className="delete-popup__actions">
            <button
              className="delete-popup__button delete-popup__button_keep"
              type="button"
              onClick={closeDeletePopup}
            >
              No, keep it
            </button>

            <button
              className="delete-popup__button delete-popup__button_cancel"
              type="button"
              onClick={() => handleDelete(reservationToDelete._id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Canceling..." : "Yes, cancel"}
            </button>
          </div>

          {deleteError && <p className="popup__error">{deleteError}</p>}
        </div>
      </Popup>
      <Popup isOpen={editingReservation !== null} onClose={closeEditPopup}>
        <div className="edit-reservation">
          <p className="edit-reservation__eyebrow">YOUR TABLE</p>

          <h2 className="edit-reservation__title">Edit reservation</h2>

          <div className="edit-reservation__form">
            <label className="edit-reservation__field">
              <span className="edit-reservation__label">Date</span>

              <input
                className={`edit-reservation__input ${
                  editFormErrors.date ? "edit-reservation__input_error" : ""
                }`}
                type="date"
                min={today}
                value={editDate}
                onChange={(event) => setEditDate(event.target.value)}
              />

              {editFormErrors.date && (
                <span className="edit-reservation__error">
                  {editFormErrors.date}
                </span>
              )}
            </label>

            <label className="edit-reservation__field">
              <span className="edit-reservation__label">Time</span>

              <select
                className={`edit-reservation__input ${
                  editFormErrors.time ? "edit-reservation__input_error" : ""
                }`}
                value={editTime}
                onChange={(event) => setEditTime(event.target.value)}
              >
                {reservationTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              {editFormErrors.time && (
                <span className="edit-reservation__error">
                  {editFormErrors.time}
                </span>
              )}
            </label>

            <label className="edit-reservation__field">
              <span className="edit-reservation__label">Guests</span>

              <input
                className={`edit-reservation__input ${
                  editFormErrors.guests ? "edit-reservation__input_error" : ""
                }`}
                type="number"
                min="1"
                max="20"
                value={editGuests}
                onChange={(event) => setEditGuests(event.target.value)}
              />

              {editFormErrors.guests && (
                <span className="edit-reservation__error">
                  {editFormErrors.guests}
                </span>
              )}
            </label>

            {editError && (
              <p className="edit-reservation__error edit-reservation__error_general">
                {editError}
              </p>
            )}

            <div className="edit-reservation__actions">
              <button
                className="edit-reservation__button edit-reservation__button_secondary"
                type="button"
                onClick={closeEditPopup}
              >
                Cancel
              </button>

              <button
                className="edit-reservation__button edit-reservation__button_primary"
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </main>
  );
}

export default MyReservations;
