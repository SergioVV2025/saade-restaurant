import saadeStars from "../../assets/saade-stars.svg";
import galleryImages from "../../utils/galleryData";

function Gallery() {
  const galleryBlocks = [];
  const featuredImage = galleryImages.find((image) => image.layout === "wide");

  for (let i = 0; i < galleryImages.length; i++) {
    const image = galleryImages[i];

    if (image.layout === "wide") {
      continue;
    }

    if (image.layout === "landscape") {
      const nextImage = galleryImages[i + 1];

      if (nextImage?.layout === "landscape") {
        galleryBlocks.push({
          type: "landscape-pair",
          images: [image, nextImage],
        });

        i++;
      } else {
        galleryBlocks.push({
          type: "landscape",
          images: [image],
        });
      }

      continue;
    }

    if (image.layout === "portrait") {
      const nextImage = galleryImages[i + 1];

      if (nextImage?.layout === "portrait") {
        galleryBlocks.push({
          type: "pair",
          images: [image, nextImage],
        });

        i++;
      } else {
        galleryBlocks.push({
          type: "single",
          images: [image],
        });
      }
    }
  }

  return (
    <main className="gallery">
      <section className="gallery__hero">
        <img
          className="gallery__stars"
          src={saadeStars}
          alt=""
          aria-hidden="true"
        />

        <p className="gallery__eyebrow">AROUND THE TABLE</p>

        <h1 className="gallery__title">
          <span className="gallery__title-main">Eat. Drink.</span>
          <span className="gallery__title-accent">Stay awhile.</span>
        </h1>

        <p className="gallery__intro">
          Food, friends, late nights and everything in between.
        </p>
      </section>
      {featuredImage && (
        <section className="gallery__feature">
          <img
            className="gallery__feature-image"
            src={featuredImage.src}
            alt={featuredImage.alt}
          />
        </section>
      )}
      {galleryBlocks.map((block, blockIndex) => {
        const image = block.images[0];

        if (block.type === "landscape-pair") {
          return (
            <section className="gallery__landscape-pair" key={image.id}>
              {block.images.map((pairImage, index) => (
                <figure
                  className={`gallery__landscape-item ${
                    index === 0
                      ? "gallery__landscape-item_primary"
                      : "gallery__landscape-item_secondary"
                  }`}
                  key={pairImage.id}
                >
                  <img
                    className="gallery__landscape-pair-image"
                    src={pairImage.src}
                    alt={pairImage.alt}
                    loading="lazy"
                  />
                </figure>
              ))}
            </section>
          );
        }

        if (block.type === "landscape") {
          return (
            <section className="gallery__landscape" key={image.id}>
              <img
                className="gallery__landscape-image"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </section>
          );
        }

        if (block.type === "single") {
          return (
            <section
              className="gallery__moments gallery__moments_single"
              key={image.id}
            >
              <figure className="gallery__moment gallery__moment_primary">
                <img
                  className="gallery__moment-image"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              </figure>
            </section>
          );
        }

        if (block.type === "pair") {
          return (
            <section
              className={`gallery__moments ${
                galleryBlocks
                  .slice(0, blockIndex)
                  .filter((previousBlock) => previousBlock.type === "pair")
                  .length %
                  2 !==
                0
                  ? "gallery__moments_reverse"
                  : ""
              }`}
              key={image.id}
            >
              {block.images.map((pairImage, index) => (
                <figure
                  className={`gallery__moment ${
                    index === 0
                      ? "gallery__moment_primary"
                      : "gallery__moment_offset"
                  }`}
                  key={pairImage.id}
                >
                  <img
                    className="gallery__moment-image"
                    src={pairImage.src}
                    alt={pairImage.alt}
                    loading="lazy"
                  />
                </figure>
              ))}
            </section>
          );
        }

        return null;
      })}
    </main>
  );
}

export default Gallery;
