import React from "react";
import PropTypes from "prop-types";

import "~styles/index.scss";

const Layout = ({ children, className }) => (
  <div className="layout w-full relative">
    <main className={`layout__container ${className}`}>{children}</main>
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};
