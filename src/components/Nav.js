/* eslint-disable react/prop-types */

import React, { Component, useContext } from "react";
import { Link } from "gatsby";
import { AppContext } from "~context/AppContext";
import { fancyError } from "~utils/helpers";

class NavComponent extends Component {
  componentDidMount() {
    this.addKeyupListeners();
    this.addScrollListeners();
  }

  //

  addKeyupListeners = () => {
    window.addEventListener(`keyup`, e => {
      switch (e.keyCode) {
        case 27:
          this.close();

          break;

        default:
          break;
      }
    });
  };

  addScrollListeners = () => {
    document.addEventListener(`scroll`, () => {
      this.close();
    });
  };

  //

  checkout = () => {
    if (
      !process.env.GATSBY_SHOPIFY_STORE ||
      process.env.GATSBY_SHOPIFY_STORE === ``
    ) {
      fancyError(`Shopify environment variables have not been defined.`);
    }

    const { appContext } = this.props;

    let cartString = ``;

    appContext.cart.forEach(cartItem => {
      let prefix = `,`;

      if (cartString === ``) {
        prefix = `/`;
      }

      cartString = `${cartString}${prefix}${cartItem.admin_variant_id}:${cartItem.quantity}`;
    });

    const win = window.open(
      `https://${process.env.GATSBY_SHOPIFY_STORE}.myshopify.com/cart${cartString}`,
      `_blank`
    );

    win.focus();
  };

  close = () => {
    const { appContext } = this.props;

    appContext.setCartActive(false);
    appContext.setMenuActive(false);
  };

  //

  render() {
    const { appContext } = this.props;

    return (
      <div
        className={`nav ${appContext.cartActive ? `cart-active` : ``} ${
          appContext.menuActive ? `menu-active` : ``
        } w-screen h-screen fixed flex items-center justify-between z-50`}
      >
        <div
          role="presentation"
          className="nav__background w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-black z-10"
          onClick={this.close}
        ></div>

        <div className="nav__cart h-full absolute top-0 right-0 pt-16 px-4 z-20 bg-black text-white">
          <h3 className="f3 mb-4">Cart</h3>

          {(appContext.cart && appContext.cart.length && (
            <>
              <ul>
                {appContext.cart.map(cartItem => (
                  <li
                    key={cartItem.handle}
                    className="relative py-4 flex items-stretch"
                  >
                    <h3 className="f4 mb-4">{cartItem.title}</h3>
                    <p className="b1">${cartItem.variants[0].price}</p>

                    <div>x{cartItem.quantity}</div>
                  </li>
                ))}
              </ul>

              <div className="relative mt-4">
                <h4 className="f4">Total: {cartTotal.toFixed(2)}</h4>
              </div>

              <button
                type="button"
                onClick={this.checkout}
                className="button w-full mt-6 mb-12"
              >
                Checkout
              </button>
            </>
          )) || <h4 className="b1">Your cart is empty.</h4>}
        </div>

        <ul className="nav__menu h-full absolute top-0 left-0 py-24 px-4 z-20 bg-black text-white">
          <li className="nav__menu__link f3">
            <Link
              className="block text-white"
              to="/"
              onClick={() => appContext.setMenuActive(false)}
            >
              <span>Home</span>
            </Link>
          </li>

          <li className="nav__menu__link f3">
            <Link
              className="block text-white"
              to="/about"
              onClick={() => appContext.setMenuActive(false)}
            >
              <span>About</span>
            </Link>
          </li>

          <li className="nav__menu__link f3">
            <Link
              className="block text-white"
              to="/contact"
              onClick={() => appContext.setMenuActive(false)}
            >
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const Nav = () => {
  const appContext = useContext(AppContext);

  return <NavComponent appContext={appContext} />;
};

export default Nav;
