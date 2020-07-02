import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { globalHistory } from "@reach/router";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [headerStyle, setHeaderStyle] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [pathname, setPathname] = useState(null);

  useEffect(() => {
    if (window) {
      setPathname(window.location.pathname);
    }

    return globalHistory.listen(({ location }) => {
      setPathname(location.pathname);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        headerStyle,
        setHeaderStyle,
        menuActive,
        setMenuActive,
        pathname
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
