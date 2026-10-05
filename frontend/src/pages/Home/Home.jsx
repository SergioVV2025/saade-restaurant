import Hero from "../../components/Hero/Hero";
import { Link } from "react-router-dom";

import homeVideo from "../../assets/home_media/pexels_2.mp4";
import SocialLink from "../../components/SocialLinks/SocialLinks";
import saadeStars from "../../assets/saade-stars.svg";
import saadePalm from "../../assets/saade-palm.svg";

function Home() {
  return (
    <main className="content">
      <Hero />

      <section className="home-intro">
        <div className="home-intro__eyebrow-group">
          <img
            className="home-intro__stars"
            src={saadeStars}
            alt=""
            aria-hidden="true"
          />

          <p className="home-intro__eyebrow">
            <span>Silver Lake</span>

            <img
              className="home-intro__palm"
              src={saadePalm}
              alt=""
              aria-hidden="true"
            />

            <span>Los Angeles</span>
          </p>
        </div>

        <div className="home-intro__grid">
          <h2 className="home-intro__title">
            Food made for
            <br />
            <span className="home-intro__title-accent">hanging out.</span>
          </h2>

          <div className="home-intro__copy">
            <p>Good food, cold drinks, music, and a table worth staying at.</p>

            <Link className="home-intro__link" to="/menu">
              Explore menu →
            </Link>
          </div>
        </div>
      </section>

      <section className="home-media">
        <video
          className="home-media__video"
          src={homeVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      <section className="home-reservation">
        <div className="home-reservation__main">
          <p className="home-reservation__eyebrow">Come hang</p>

          <h2 className="home-reservation__title">
            Come hungry.
            <br />
            <span className="home-reservation__title-accent">Stay awhile.</span>
          </h2>

          <Link className="home-reservation__link" to="/reservation">
            Reserve a table →
          </Link>
        </div>

        <div className="home-reservation__info">
          <div className="home-reservation__group">
            <p className="home-reservation__label">Visit</p>
            <p>
              Sunset Boulevard
              <br />
              Silver Lake · Los Angeles
            </p>
          </div>

          <div className="home-reservation__group">
            <p className="home-reservation__label">Hours</p>
            <p>
              Mon–Thu · 5pm–11pm
              <br />
              Fri–Sun · 12pm–late
            </p>
          </div>

          <div className="home-reservation__group">
            <p className="home-reservation__label">Contact</p>
            <p>
              +1 000 000 0000
              <br />
              info@santorestaurants.com
            </p>
          </div>

          <div className="home-reservation__group">
            <p className="home-reservation__label">Follow</p>

            <div className="home-reservation__socials">
              <SocialLink platform="instagram" label="Instagram" href="#" />
              <SocialLink platform="tiktok" label="TikTok" href="#" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
