import React, { useContext } from "react";
import { Link } from "gatsby";
import { AppContext } from "~context/AppContext";

const Header = () => {
  const { cartActive, menuActive, setCartActive, setMenuActive } = useContext(
    AppContext
  );

  const toggleCart = () => {
    setCartActive(!cartActive);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header
      className={`header ${cartActive ? ` cart-active` : ``} ${
        menuActive ? ` menu-active` : ``
      } transition-transform w-full fixed top-0 right-0 left-0 z-30 py-2`}
    >
      <nav className="grid">
        <div className="grid-end-12 flex items-center justify-between">
          <button
            type="button"
            className="header__menu w-6 h-4 relative flex flex-col items-center justify-between"
            onClick={toggleMenu}
          >
            <div className="header__menu__line transition-opacity-transform w-6 border-b-2 border-black"></div>
            <div className="header__menu__line transition-opacity-transform w-6 border-b-2 border-black"></div>
            <div className="header__menu__line transition-opacity-transform w-6 border-b-2 border-black"></div>
          </button>

          <Link to="/" className="block text-black">
            <h2 className="f4">Header</h2>
          </Link>

          <button type="button" onClick={toggleCart}>
            Cart
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
