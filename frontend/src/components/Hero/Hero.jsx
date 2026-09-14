import { Link } from "react-router-dom";

import heroVideo from "../../assets/home_media/pexels_7.mp4";

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
      />

      <div className="hero__content">
        <p className="hero__eyebrow">Silver Lake · Los Angeles</p>

        <h1 className="hero__title">
          Eat well.
          <br />
          Stay awhile.
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
