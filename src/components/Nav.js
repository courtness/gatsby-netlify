/* eslint-disable react/prop-types */

import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import { AppContext } from "~context/AppContext";
import { DocumentContext } from "~context/DocumentContext";
import Cross from "~components/svg/Cross";
import { useKeyPress } from "~utils/hooks";

const Nav = () => {
  const { menuActive, setMenuActive } = useContext(AppContext);
  const { scrollTop } = useContext(DocumentContext);

  //

  const close = () => {
    setMenuActive(false);
  };

  //

  const escKeyPressed = useKeyPress(`Escape`);

  useEffect(() => {
    close();
  }, [escKeyPressed]);

  useEffect(() => {
    close();
  }, [scrollTop]);

  //

  return (
    <div
      className={`nav ${
        menuActive ? `menu-active` : ``
      } w-screen h-screen fixed flex items-center justify-between z-40 pointer-events-none`}
    >
      <div
        role="presentation"
        className={`nav__background ${
          menuActive ? `opacity-50 pointer-events-auto` : `opacity-0`
        } transition-opacity w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-10 bg-black`}
        onClick={close}
      ></div>

      <div
        className={`nav__menu ${
          menuActive ? `pointer-events-auto` : ``
        } transition-transform h-full absolute top-0 left-0 pt-16 px-8 z-20 bg-black text-white`}
      >
        <button
          className="w-12 h-12 absolute top-0 left-0 flex items-center justify-center ml-2"
          onClick={close}
          type="button"
        >
          <Cross className="w-5 h-5" color="white" />
        </button>

        {menuActive && (
          <ul>
            <li className="animation-appear-right animation-delay-3 hover-underline f3">
              <Link to="/" className="block py-2" onClick={close}>
                Home
              </Link>
            </li>

            <li className="animation-appear-right animation-delay-3 hover-underline f3">
              <Link to="/about" className="block py-2" onClick={close}>
                About
              </Link>
            </li>

            <li className="animation-appear-right animation-delay-3 hover-underline f3">
              <Link to="/blog" className="block py-2" onClick={close}>
                Blog
              </Link>
            </li>

            <li className="animation-appear-right animation-delay-3 hover-underline f3">
              <Link to="/contact" className="block py-2" onClick={close}>
                Contact
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Nav;
