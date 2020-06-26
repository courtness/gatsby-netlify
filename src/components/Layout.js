import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children, className }) => (
  <>
    <div
      id="layout-background-example"
      className="layout__background w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50 bg-black pointer-events-none"
    ></div>

    <main className={`layout ${className}`}>{children}</main>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};
