import friendsGroup from "../../assets/about_media/friends-group.jpg";
import saadeStars from "../../assets/saade-stars.svg";
import saadePalm from "../../assets/saade-palm.svg";

function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <div className="about__eyebrow-group">
          <img
            className="about__stars"
            src={saadeStars}
            alt=""
            aria-hidden="true"
          />

          <p className="about__eyebrow">
            <span>Silver Lake</span>

            <img
              className="about__palm"
              src={saadePalm}
              alt=""
              aria-hidden="true"
            />

            <span>Los Angeles</span>
          </p>
        </div>

        <h1 className="about__title">
          Your neighborhood
          <br />
          <span className="about__title-accent">table.</span>
        </h1>

        <p className="about__intro">
          Saade is a place for food, drinks, music and the people you want to
          share them with.
        </p>
      </section>

      <section className="about__story">
        <div className="about__story-content">
          <p className="about__eyebrow">ABOUT SAADE</p>

          <h2 className="about__subtitle">
            Made for
            <br />
            hanging out.
          </h2>

          <div className="about__story-text">
            <p>
              Located in Silver Lake, Saade brings together food, drinks and
              music in a relaxed space made for sharing.
            </p>

            <p>
              Come for a bite, stay for another drink, and make yourself at
              home.
            </p>
          </div>
        </div>

        <div className="about__media">
          <img
            className="about__image"
            src={friendsGroup}
            alt="Friends sharing dinner at a restaurant"
          />
        </div>
      </section>

      <section className="about__statement">
        <p>FOOD · DRINKS · MUSIC · GOOD COMPANY</p>
      </section>
    </main>
  );
}

export default About;
