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
        className={`header ${appContext.cartActive ? ` cart-active` : ``} ${
          appContext.menuActive ? ` menu-active` : ``
        } transition-transform w-full fixed top-0 right-0 left-0 z-30 py-2 bg-white border-b-black`}
      >
        <nav className="grid">
          <div className="grid-end-12 flex items-center justify-between">
            <button
              type="button"
              className="header__menu w-6 h-4 relative flex flex-col items-center justify-between"
              onClick={this.toggleMenu}
            >
              <div className="header__menu__line transition-opacity-transform w-6 border-b-2 border-black"></div>
              <div className="header__menu__line transition-opacity-transform w-6 border-b-2 border-black"></div>
              <div className="header__menu__line transition-opacity-transform w-6 border-b-2 border-black"></div>
            </button>

            <Link to="/" className="block text-black">
              <h2 className="f4">Header</h2>
            </Link>

            <button type="button" onClick={this.toggleCart}>
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
