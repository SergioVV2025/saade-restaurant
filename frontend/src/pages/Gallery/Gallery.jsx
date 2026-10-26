import { useEffect, useState, useRef } from "react";
import galleryImages from "../../utils/galleryData";
import saadeStars from "../../assets/saade-stars.svg";
import saadePalm from "../../assets/saade-palm.svg";

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const touchStartX = useRef(null);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    touchStartX.current = null;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  };

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const showPreviousImage = () => {
    setSelectedIndex(
      (currentIndex) =>
        (currentIndex - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    setSelectedIndex(
      (currentIndex) => (currentIndex + 1) % galleryImages.length,
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex(
          (currentIndex) =>
            (currentIndex - 1 + galleryImages.length) % galleryImages.length,
        );
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex(
          (currentIndex) => (currentIndex + 1) % galleryImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex]);

  return (
    <main className="gallery">
      <header className="gallery__header">
        <div className="gallery__eyebrow-group">
          <img
            className="gallery__stars"
            src={saadeStars}
            alt=""
            aria-hidden="true"
          />

          <p className="gallery__eyebrow">
            <span>Silver Lake</span>

            <img
              className="gallery__palm"
              src={saadePalm}
              alt=""
              aria-hidden="true"
            />

            <span>Los Angeles</span>
          </p>
        </div>

        <h1 className="gallery__title">
          Life at
          <br />
          <span className="gallery__title-accent">Saade.</span>
        </h1>

        <p className="gallery__intro">
          Good food, familiar faces, shared tables, and nights worth
          remembering.
        </p>
      </header>
      <section className="gallery-grid">
        {galleryImages.map((image, index) => (
          <button
            className="gallery-grid__item"
            type="button"
            key={image.id}
            onClick={() => setSelectedIndex(index)}
          >
            <img
              className="gallery-grid__image"
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
          </button>
        ))}
        {selectedImage && (
          <div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="gallery-lightbox__media">
              <button
                className="gallery-lightbox__close"
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close photo viewer"
              >
                ✕
              </button>

              <img
                className="gallery-lightbox__image"
                src={selectedImage.src}
                alt={selectedImage.alt}
              />
            </div>
            <button
              className="gallery-lightbox__arrow gallery-lightbox__arrow_prev"
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className="gallery-lightbox__arrow gallery-lightbox__arrow_next"
              type="button"
              onClick={showNextImage}
              aria-label="Next photo"
            >
              ›
            </button>

            <div className="gallery-lightbox__controls">
              <button
                className="gallery-lightbox__control"
                type="button"
                onClick={showPreviousImage}
                aria-label="Previous photo"
              >
                ‹
              </button>

              <p className="gallery-lightbox__counter">
                {selectedIndex + 1} / {galleryImages.length}
              </p>

              <button
                className="gallery-lightbox__control"
                type="button"
                onClick={showNextImage}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Gallery;
