import { useState, useEffect } from "react";

function MenuItem({ name, description, price, image, imageAlt }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasImage = Boolean(image);

  function handleToggle() {
    if (!hasImage) return;

    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="menu-item">
      <div className="menu-item__header">
        <div className="menu-item__details">
          <h3 className="menu-item__name">
            {hasImage ? (
              <button
                className="menu-item__trigger"
                type="button"
                onClick={handleToggle}
                aria-expanded={isOpen}
              >
                <span>{name}</span>

                <span className="menu-item__indicator" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            ) : (
              name
            )}
          </h3>

          <p className="menu-item__description">{description}</p>
        </div>

        <span className="menu-item__price">{price}</span>
      </div>

      {hasImage && (
        <div
          className={`menu-item__expandable ${
            isOpen ? "menu-item__expandable_open" : ""
          }`}
          inert={!isOpen}
        >
          <div className="menu-item__expandable-inner">
            <div className="menu-item__media">
              <button
                className="menu-item__image-button"
                type="button"
                onClick={handleToggle}
                aria-label={`Close photo of ${name}`}
                tabIndex={isOpen ? 0 : -1}
              >
                <img
                  className="menu-item__image"
                  src={image}
                  alt={imageAlt || name}
                  loading="lazy"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuItem;
