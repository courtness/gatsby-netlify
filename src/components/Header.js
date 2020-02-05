/* eslint-disable react/prop-types */

import React, { Component, useContext } from "react";
import { Link } from "gatsby";
import { AppContext } from "~context/AppContext";

class HeaderComponent extends Component {
  toggleCart = () => {
    const { appContext } = this.props;

    appContext.setCartActive(!appContext.cartActive);
  };

  toggleMenu = () => {
    const { appContext } = this.props;

    appContext.setMenuActive(!appContext.menuActive);
  };

  //

  render() {
    const { appContext } = this.props;

    return (
      <header
        className={`header w-full fixed top-0 right-0 left-0 z-30 py-2 ${
          appContext.cartActive ? ` cart-active` : ``
        } ${appContext.menuActive ? ` menu-active` : ``}`}
      >
        <nav className="relative grid">
          <div className="grid-end-12 flex items-center justify-between">
            <button
              type="button"
              className={`header__menu relative ${
                appContext.menuActive ? `menu-active` : ``
              } relative`}
              onClick={this.toggleMenu}
            >
              <div className="header__menu__line header__menu__line--0"></div>
              <div className="header__menu__line header__menu__line--1"></div>
              <div className="header__menu__line header__menu__line--2"></div>
            </button>

            <Link to="/" className="block text-black">
              <h2 className="f4">Header</h2>
            </Link>

            <button
              type="button"
              className={`header__cart relative ${
                appContext.cartActive ? `cart-active` : ``
              } relative`}
              onClick={this.toggleCart}
            >
              Cart
            </button>
          </div>
        </nav>
      </header>
    );
  }
}

const Header = () => {
  const appContext = useContext(AppContext);

  return <HeaderComponent appContext={appContext} />;
};

export default Header;
