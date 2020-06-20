/* eslint-disable react/prop-types */

import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import { AppContext } from "~context/AppContext";
import { fancyError } from "~utils/helpers";
import { useKeyPress } from "~utils/hooks";

const Nav = () => {
  const {
    cart,
    cartActive,
    menuActive,
    setCartActive,
    setMenuActive
  } = useContext(AppContext);

  //

  const cartTotal = 0;

  const checkout = () => {
    if (
      !process.env.GATSBY_SHOPIFY_STORE ||
      process.env.GATSBY_SHOPIFY_STORE === ``
    ) {
      fancyError(`Shopify environment variables have not been defined.`);

      return;
    }

    let cartString = ``;

    cart.forEach(cartItem => {
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

  const close = () => {
    setCartActive(false);
    setMenuActive(false);
  };

  const escKeyPressed = useKeyPress(`Escape`);

  useEffect(() => {
    close();
  }, [escKeyPressed]);

  //

  return (
    <div
      className={`nav ${cartActive ? `cart-active` : ``} ${
        menuActive ? `menu-active` : ``
      } w-screen h-screen fixed flex items-center justify-between z-50`}
    >
      <div
        role="presentation"
        className="nav__background w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-black z-10"
        onClick={close}
      ></div>

      <div className="nav__cart h-full absolute top-0 right-0 pt-16 px-4 z-20 bg-black text-white">
        <h3 className="f3 mb-4">Cart</h3>

        {(cart && cart.length && (
          <>
            <ul>
              {cart.map(cartItem => (
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
              onClick={checkout}
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
            onClick={() => setMenuActive(false)}
          >
            <span>Home</span>
          </Link>
        </li>

        <li className="nav__menu__link f3">
          <Link
            className="block text-white"
            to="/about"
            onClick={() => setMenuActive(false)}
          >
            <span>About</span>
          </Link>
        </li>

        <li className="nav__menu__link f3">
          <Link
            className="block text-white"
            to="/contact"
            onClick={() => setMenuActive(false)}
          >
            <span>Contact</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
