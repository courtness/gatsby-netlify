import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AppContext } from "~context/AppContext";
// import Geolocator from "~components/Geolocator";

const Layout = ({ children, className, header }) => {
  const { headerStyle, setHeaderStyle } = useContext(AppContext);

  useEffect(() => {
    if (header !== headerStyle) {
      setHeaderStyle(header);
    }
  }, [header]);

  return (
    <>
      {/* <Geolocator /> */}

      <main id="layout" className={`layout ${className}`}>
        {children}
      </main>
    </>
  );
};

Layout.defaultProps = {
  header: `white`
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  header: PropTypes.string
};

export default Layout;
