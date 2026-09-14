import friendsGroup from "../../assets/about_media/friends-group.jpg";

function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <p className="about__eyebrow">Silver Lake · Los Angeles</p>

        <h1 className="about__title">
          Your neighborhood
          <br />
          table.
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
