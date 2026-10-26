import MenuSection from "../../components/MenuSection/MenuSection";
import MenuItem from "../../components/MenuItem/MenuItem";
import MenuCategory from "../../components/MenuCategory/MenuCategory";

import menuFoodImage from "../../assets/menu_media/menu-food.jpg";
import menuDrinksImage from "../../assets/menu_media/menu-drinks.jpg";
import saadeStars from "../../assets/saade-stars.svg";
import saadePalm from "../../assets/saade-palm.svg";

function Menu() {
  return (
    <main className="menu">
      <header className="menu__header">
        <div className="menu__eyebrow-group">
          <img
            className="menu__stars"
            src={saadeStars}
            alt=""
            aria-hidden="true"
          />

          <p className="menu__eyebrow">
            <span>Eat & drink</span>

            <img
              className="menu__palm"
              src={saadePalm}
              alt=""
              aria-hidden="true"
            />

            <span>Silver Lake</span>
          </p>
        </div>

        <div className="menu__header-grid">
          <h1 className="menu__title">Menu</h1>

          <div className="menu__intro">
            <p className="menu__description">
              Rooted in Middle Eastern traditions, made for sharing.
            </p>

            <p className="menu__note">
              Familiar ingredients, fresh interpretations, and plates meant to
              bring everyone together.
            </p>
          </div>
        </div>
      </header>

      <div className="menu__sections">
        <MenuSection title="Food" target="food">
          <a href="#food-starters">Starters ↘</a>
          <a href="#food-mains">Main courses ↘</a>
          <a href="#food-sharing">To share ↘</a>
          <a href="#food-desserts">Desserts ↘</a>
        </MenuSection>

        <MenuSection title="Drinks" target="drinks">
          <a href="#drinks-cocktails">Cocktails ↘</a>
          <a href="#drinks-wine">Wine ↘</a>
          <a href="#drinks-beer">Beer ↘</a>
          <a href="#drinks-zero-proof">Zero proof ↘</a>
        </MenuSection>

        <MenuSection title="Late night" target="late-night">
          <a href="#late-snacks">Snacks ↘</a>
          <a href="#late-drinks">Drinks ↘</a>
        </MenuSection>
      </div>
      <section className="menu-food" id="food">
        <div className="menu-food__content">
          <p className="menu-food__eyebrow">Food</p>

          <h2 className="menu-food__title">
            Made for
            <br />
            <span className="menu-food__title-accent">the table.</span>
          </h2>

          <div className="menu-food__list">
            <MenuCategory id="food-starters" title="Starters">
              <MenuItem
                name="Charred flatbread"
                description="Whipped feta, herbs, chili oil"
                price="$16"
                image={menuFoodImage}
                imageAlt="Charred flatbread served at the table"
              />

              <MenuItem
                name="Roasted carrots"
                description="Labneh, pistachio, burnt honey"
                price="$14"
              />
            </MenuCategory>
            <MenuCategory id="food-mains" title="Main courses">
              <MenuItem
                name="Grilled chicken"
                description="Green sauce, charred lemon"
                price="$24"
              />
            </MenuCategory>

            {/* Las demás categorías las incorporaremos después */}
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
      <section className="menu-drinks" id="drinks">
        <div className="menu-drinks__media">
          <img
            className="menu-drinks__image"
            src={menuDrinksImage}
            alt="Freshly prepared cocktail with herbs and fruit"
          />
        </div>

        <div className="menu-drinks__content">
          <p className="menu-drinks__eyebrow">Drinks</p>

          <h2 className="menu-drinks__title">
            Something
            <br />
            <span className="menu-drinks__title-accent">to drink.</span>
          </h2>

          <div className="menu-drinks__list">
            <MenuCategory id="drinks-cocktails" title="Cocktails">
              <MenuItem
                name="House spritz"
                description="Citrus, bitter orange, bubbles"
                price="$15"
                image={menuDrinksImage}
                imageAlt="Cocktail served with fresh ingredients"
              />

              <MenuItem
                name="Spicy margarita"
                description="Tequila, lime, chili, agave"
                price="$16"
              />

              <MenuItem
                name="Cold brew martini"
                description="Vodka, coffee, cacao"
                price="$17"
              />
            </MenuCategory>

            <MenuCategory id="drinks-zero-proof" title="Zero proof">
              <MenuItem
                name="Garden tonic"
                description="Cucumber, herbs, tonic"
                price="$10"
              />
            </MenuCategory>
          </div>
        </div>
      </section>
      <section className="menu-late" id="late-night">
        <div className="menu-late__header">
          <p className="menu-late__eyebrow">Late night</p>

          <h2 className="menu-late__title">
            Stay for
            <br />
            <span className="menu-late__title-accent">one more.</span>
          </h2>
        </div>

        <div className="menu-late__body">
          <div className="menu-late__list">
            <MenuCategory id="late-snacks" title="Snacks">
              <MenuItem
                name="Midnight fries"
                description="Garlic, herbs, spicy ketchup"
                price="$11"
              />

              <MenuItem
                name="Grilled cheese"
                description="Three cheeses, chili honey"
                price="$14"
              />
            </MenuCategory>

            <MenuCategory id="late-drinks" title="Drinks">
              <MenuItem
                name="Night cap"
                description="Dealer's choice"
                price="$15"
              />
            </MenuCategory>
          </div>

          <p className="menu-late__note">Good decisions optional.</p>
        </div>
      </section>
      <p className="menu__disclaimer">
        Sample menu for presentation purposes. Dishes, availability, and prices
        are subject to confirmation.
      </p>
    </main>
  );
}

export default Menu;
