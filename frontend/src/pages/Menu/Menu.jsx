import MenuSection from "../../components/MenuSection/MenuSection";

import menuFoodImage from "../../assets/menu_media/menu-food.jpg";
import menuDrinksImage from "../../assets/menu_media/menu-drinks.jpg";

function Menu() {
  return (
    <main className="menu">
      <header className="menu__header">
        <p className="menu__eyebrow">Eat & drink</p>

        <div className="menu__header-grid">
          <h1 className="menu__title">Menu</h1>

          <div className="menu__intro">
            <p className="menu__description">
              Good food, cold drinks and plenty to share.
            </p>

            <p className="menu__note">
              Seasonal plates, drinks and late-night bites made for the table.
            </p>
          </div>
        </div>
      </header>

      <div className="menu__sections">
        <MenuSection title="Food">
          <p>Seasonal plates</p>
          <p>Things to share</p>
          <p>Something sweet</p>
        </MenuSection>

        <MenuSection title="Drinks">
          <p>Cocktails</p>
          <p>Wine</p>
          <p>Beer</p>
          <p>Zero proof</p>
        </MenuSection>

        <MenuSection title="Late night">
          <p>Snacks</p>
          <p>Drinks</p>
          <p>Good decisions optional</p>
        </MenuSection>
      </div>
      <section className="menu-food">
        <div className="menu-food__content">
          <p className="menu-food__eyebrow">Food</p>

          <h2 className="menu-food__title">
            Made for
            <br />
            the table.
          </h2>

          <div className="menu-food__list">
            <div className="menu-food__item">
              <div>
                <h3>Charred flatbread</h3>
                <p>Whipped feta, herbs, chili oil</p>
              </div>

              <span>$16</span>
            </div>

            <div className="menu-food__item">
              <div>
                <h3>Roasted carrots</h3>
                <p>Labneh, pistachio, burnt honey</p>
              </div>

              <span>$14</span>
            </div>

            <div className="menu-food__item">
              <div>
                <h3>Crispy potatoes</h3>
                <p>Garlic, lemon, herbs</p>
              </div>

              <span>$12</span>
            </div>

            <div className="menu-food__item">
              <div>
                <h3>Grilled chicken</h3>
                <p>Green sauce, charred lemon</p>
              </div>

              <span>$24</span>
            </div>
          </div>
        </div>

        <div className="menu-food__media">
          <img
            className="menu-food__image"
            src={menuFoodImage}
            alt="Food served at the table"
          />
        </div>
      </section>
      <section className="menu-drinks">
        <div className="menu-drinks__media">
          <img
            className="menu-drinks__image"
            src={menuDrinksImage}
            alt="Food served at the table"
          />
        </div>

        <div className="menu-drinks__content">
          <p className="menu-drinks__eyebrow">Drinks</p>

          <h2 className="menu-drinks__title">
            Something
            <br />
            to drink.
          </h2>

          <div className="menu-drinks__list">
            <div className="menu-drinks__item">
              <div>
                <h3>House spritz</h3>
                <p>Citrus, bitter orange, bubbles</p>
              </div>

              <span>$15</span>
            </div>

            <div className="menu-drinks__item">
              <div>
                <h3>Spicy margarita</h3>
                <p>Tequila, lime, chili, agave</p>
              </div>

              <span>$16</span>
            </div>

            <div className="menu-drinks__item">
              <div>
                <h3>Cold brew martini</h3>
                <p>Vodka, coffee, cacao</p>
              </div>

              <span>$17</span>
            </div>

            <div className="menu-drinks__item">
              <div>
                <h3>Garden tonic</h3>
                <p>Cucumber, herbs, tonic · zero proof</p>
              </div>

              <span>$10</span>
            </div>
          </div>
        </div>
      </section>
      <section className="menu-late">
        <div className="menu-late__header">
          <p className="menu-late__eyebrow">Late night</p>

          <h2 className="menu-late__title">
            Stay for
            <br />
            one more.
          </h2>
        </div>

        <div className="menu-late__body">
          <div className="menu-late__list">
            <div className="menu-late__item">
              <div>
                <h3>Midnight fries</h3>
                <p>Garlic, herbs, spicy ketchup</p>
              </div>

              <span>$11</span>
            </div>

            <div className="menu-late__item">
              <div>
                <h3>Grilled cheese</h3>
                <p>Three cheeses, chili honey</p>
              </div>

              <span>$14</span>
            </div>

            <div className="menu-late__item">
              <div>
                <h3>Night cap</h3>
                <p>Dealer's choice</p>
              </div>

              <span>$15</span>
            </div>
          </div>

          <p className="menu-late__note">Good decisions optional.</p>
        </div>
      </section>
    </main>
  );
}

export default Menu;
