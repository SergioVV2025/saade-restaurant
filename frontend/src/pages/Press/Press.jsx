import saadeStars from "../../assets/saade-stars.svg";
import pressArticles from "../../utils/pressData.js";

function Press() {
  return (
    <main className="press">
      <section className="press__hero">
        <img
          className="press__stars"
          src={saadeStars}
          alt=""
          aria-hidden="true"
        />

        <p className="press__eyebrow">IN THE SPOTLIGHT</p>

        <h1 className="press__title">
          <span className="press__title-main">The word</span>
          <span className="press__title-accent"> is out.</span>
        </h1>

        <p className="press__intro">
          Good food. Great company. Stories worth sharing.
        </p>
      </section>
      <section className="press__articles">
        {pressArticles.length > 0 ? (
          <div className="press__grid">
            {pressArticles.map((article) => (
              <article className="press__article" key={article.id}>
                <p className="press__publication">{article.publication}</p>

                <h2 className="press__article-title">{article.title}</h2>

                <a
                  className="press__article-link"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read article ↗
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="press__empty">
            Good things are worth talking about. Stay tuned.
          </p>
        )}
      </section>
    </main>
  );
}

export default Press;
