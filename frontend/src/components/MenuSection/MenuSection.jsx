function MenuSection({ title, target, children }) {
  return (
    <section className="menu-section">
      <h2 className="menu-section__title">
        <a className="menu-section__title-link" href={`#${target}`}>
          {title}
          <span aria-hidden="true"> ↘</span>
        </a>
      </h2>

      <div className="menu-section__items">{children}</div>
    </section>
  );
}

export default MenuSection;
