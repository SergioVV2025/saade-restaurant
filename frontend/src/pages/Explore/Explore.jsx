import { useEffect, useState } from "react";
import { getEvents } from "../../utils/api";
import EventCard from "../../components/EventCard/EventCard";
import Preloader from "../../components/Preloader/Preloader";
import SearchForm from "../../components/SearchForm/SearchForm";
import saadeStars from "../../assets/saade-stars.svg";

function Explore() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState(3);

  async function loadEvents(keyword = "") {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getEvents(keyword);
      setEvents(data._embedded?.events || []);
    } catch (err) {
      setError(err);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isActive = true;

    getEvents("")
      .then((data) => {
        if (isActive) {
          setEvents(data._embedded?.events || []);
        }
      })
      .catch((err) => {
        if (isActive) {
          setError(err);
          setEvents([]);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  function handleSearch(keyword) {
    setVisibleEvents(3);
    loadEvents(keyword);
  }

  return (
    <main className="explore">
      <header className="explore__header">
        <div className="explore__eyebrow-group">
          <img
            className="explore__stars"
            src={saadeStars}
            alt=""
            aria-hidden="true"
          />

          <p className="explore__eyebrow">WHAT&apos;S HAPPENING</p>
        </div>

        <h1 className="explore__title">
          Explore
          <br />
          <span className="explore__title-accent">Los Angeles.</span>
        </h1>

        <p className="explore__subtitle">
          Find concerts, live shows, sports, and entertainment events around Los
          Angeles. Make a night of it before or after your visit to Saade.
        </p>
        <p className="explore__source">
          Events and ticket information provided by Ticketmaster. Availability
          may vary.
        </p>
      </header>

      {isLoading && <Preloader />}

      <SearchForm onSearch={handleSearch} />

      {!isLoading && error && (
        <p className="explore__error">
          Something went wrong while loading events. Please check your
          connection and try again later.
        </p>
      )}

      {!isLoading && !error && events.length === 0 && (
        <p className="explore__empty">No events found. Try another search.</p>
      )}

      {!isLoading && !error && events.length > 0 && (
        <section className="explore__results">
          {events.slice(0, visibleEvents).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      )}

      {visibleEvents < events.length && (
        <button
          className="explore__more-button"
          type="button"
          onClick={() => setVisibleEvents(visibleEvents + 3)}
        >
          Show more
        </button>
      )}
    </main>
  );
}

export default Explore;
