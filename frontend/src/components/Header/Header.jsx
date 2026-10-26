import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import saadeLogo from "../../assets/saade-logo-pink.svg";

function Header({ isLoggedIn, currentUser, onSigninClick, onSignout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const customClassName = ({ isActive }) =>
    `header__link ${isActive ? "header__link_active" : ""}`;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <Link className="header__logo" to="/" onClick={handleNavClick}>
        <img className="header__logo-image" src={saadeLogo} alt="Saade" />
      </Link>

      <button
        className="header__menu-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="header-navigation"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        Menu
      </button>

      <nav
        id="header-navigation"
        className={`header__nav ${isMenuOpen ? "header__nav_open" : ""}`}
        aria-label="Main navigation"
      >
        <NavLink to="/" className={customClassName} onClick={handleNavClick}>
          Home
        </NavLink>

        <NavLink
          to="/menu"
          className={customClassName}
          onClick={handleNavClick}
        >
          Menu
        </NavLink>

        <NavLink
          to="/about"
          className={customClassName}
          onClick={handleNavClick}
        >
          About
        </NavLink>

        <NavLink
          to="/gallery"
          className={customClassName}
          onClick={handleNavClick}
        >
          Gallery
        </NavLink>

        <NavLink
          to="/press"
          className={customClassName}
          onClick={handleNavClick}
        >
          Press
        </NavLink>

        <NavLink
          to="/reservation"
          className={customClassName}
          onClick={handleNavClick}
        >
          Reservations
        </NavLink>

        <NavLink
          to="/explore"
          className={customClassName}
          onClick={handleNavClick}
        >
          Explore
        </NavLink>

        {isLoggedIn && (
          <NavLink
            to="/my-reservations"
            className={customClassName}
            onClick={handleNavClick}
          >
            My Reservations
          </NavLink>
        )}

        {isLoggedIn ? (
          <div className="header__user">
            <span className="header__username">Hello, {currentUser?.name}</span>

            <button
              className="header__logout"
              type="button"
              onClick={() => {
                handleNavClick();
                onSignout();
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="header__login"
            type="button"
            onClick={() => {
              handleNavClick();
              onSigninClick();
            }}
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
