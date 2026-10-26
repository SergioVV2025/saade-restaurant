function MenuCategory({ id, title, children }) {
  return (
    <section className="menu-category" id={id}>
      <h3 className="menu-category__title">{title}</h3>

      <div className="menu-category__items">{children}</div>
    </section>
  );
}

export default MenuCategory;
