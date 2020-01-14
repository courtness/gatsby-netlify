/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Link } from "gatsby";
import { AppContext } from "~context/AppContext";

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

  close = () => {
    this.props.appContext.setMenuActive(false);
  };

  //

  render() {
    return (
      <div
        className={`nav ${
          this.props.appContext.menuActive ? `menu-active` : ``
        } w-screen h-screen fixed flex items-center justify-center z-50`}
      >
        <div
          role="presentation"
          className="nav__background w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-black z-10"
          onClick={() => {
            this.props.appContext.setMenuActive(false);
          }}
        ></div>

        <ul className="nav__menu h-full absolute top-0 left-0 py-24 px-4 z-20 bg-black">
          <li className="nav__menu__link f3 text-white">
            <Link
              className="block text-white"
              to="/"
              onClick={() => this.props.appContext.setMenuActive(false)}
            >
              Home
            </Link>
          </li>

          <li className="nav__menu__link f3 text-white">
            <Link
              className="block text-white"
              to="/about"
              onClick={() => this.props.appContext.setMenuActive(false)}
            >
              About
            </Link>
          </li>

          <li className="nav__menu__link f3 text-white">
            <Link
              className="block text-white"
              to="/contact"
              onClick={() => this.props.appContext.setMenuActive(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const Nav = () => (
  <AppContext.Consumer>
    {appContext => <NavComponent appContext={appContext} />}
  </AppContext.Consumer>
);

export default Nav;
