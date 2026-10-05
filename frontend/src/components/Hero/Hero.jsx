import { Link } from "react-router-dom";

import heroVideo from "../../assets/home_media/hero-video.mp4";
import heroPoster from "../../assets/home_media/hero-poster.webp";
import saadeStars from "../../assets/saade-stars.svg";
import saadePalm from "../../assets/saade-palm.svg";

function Hero() {
  return (
    <section className="hero">
      <video
        className="hero__video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      />

      <div className="hero__content">
        <img
          className="hero__stars"
          src={saadeStars}
          alt=""
          aria-hidden="true"
        />

        <p className="hero__eyebrow">
          <span>Silver Lake</span>

          <img
            className="hero__palm"
            src={saadePalm}
            alt=""
            aria-hidden="true"
          />

          <span>Los Angeles</span>
        </p>

        <h1 className="hero__title">
          Eat well.
          <br />
          <span className="hero__title-accent">Stay awhile.</span>
        </h1>

        <p className="hero__description">
          Food, drinks, music and good company on Sunset Boulevard.
        </p>

        <div className="hero__actions">
          <Link className="hero__button hero__button_primary" to="/reservation">
            Reserve a table
          </Link>

          <Link className="hero__button hero__button_secondary" to="/menu">
            View menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
