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
          More than
          <br />
          <span className="about__title-accent">a restaurant.</span>
        </h1>

        <p className="about__intro">
          A celebration of Middle Eastern culture, cuisine, and hospitality.
          Warm, inviting, and made for moments worth remembering.
        </p>
      </section>

      <section className="about__story">
        <div className="about__story-content">
          <p className="about__eyebrow">THE SAADE EXPERIENCE</p>

          <h2 className="about__subtitle">
            Made for
            <br />
            long evenings.
          </h2>

          <div className="about__story-text">
            <p>
              SAADE honors the culinary traditions, ingredients, and hospitality
              of the Middle East, reinterpreting them through a contemporary
              lens.
            </p>

            <p>
              A sunset cocktail turns into dinner. Dinner turns into another
              bottle of wine. A soulful soundtrack sets the mood without
              interrupting conversation, and no one feels rushed to leave.
            </p>

            <p>
              Natural materials, warm lighting, shared plates, and soulful music
              create a space that feels collected over time — relaxed, intimate,
              and full of life.
            </p>
          </div>
        </div>

        <div className="about__media">
          <img
            className="about__image"
            src={friendsGroup}
            alt="Friends sharing dinner and conversation"
          />
        </div>
      </section>

      <section className="about__statement">
        <p>
          ONE MORE DRINK.
          <br />
          ONE MORE STORY.
          <br />
          ONE MORE NIGHT.
        </p>
      </section>
    </main>
  );
}

export default About;
