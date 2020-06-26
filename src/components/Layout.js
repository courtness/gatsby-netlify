import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AppContext } from "~context/AppContext";

const Layout = ({ children, className, header }) => {
  const { headerStyle, setHeaderStyle } = useContext(AppContext);

  useEffect(() => {
    if (header !== headerStyle) {
      setHeaderStyle(header);
    }
  }, header);

  return (
    <>
      <div
        id="layout-background-example"
        className="layout__background w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50 bg-black pointer-events-none"
      ></div>

      <main className={`layout ${className}`}>{children}</main>
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  header: `white`
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  header: PropTypes.string
};
