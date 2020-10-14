import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children, className }) => {
  return (
    <>
      <main id="layout" className={`layout ${className}`}>
        {children}
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};

export default Layout;
