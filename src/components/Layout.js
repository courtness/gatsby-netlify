import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children, className }) => (
  <main className={`layout transition-transform ${className}`}>{children}</main>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};
