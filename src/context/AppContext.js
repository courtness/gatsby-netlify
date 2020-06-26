import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { globalHistory } from "@reach/router";
import { useMountEffect } from "~utils/hooks";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [cartActive, setCartActive] = useState(false);
  const [headerStyle, setHeaderStyle] = useState(`black`);
  const [menuActive, setMenuActive] = useState(false);
  const [pathname, setPathname] = useState(null);

  useMountEffect(() => {
    if (window) {
      setPathname(window.location.pathname);
    }

    return globalHistory.listen(({ location }) => {
      setPathname(location.pathname);
    });
  });

  //

  return (
    <AppContext.Provider
      value={{
        cartActive,
        headerStyle,
        menuActive,
        pathname,
        //
        setCartActive,
        setHeaderStyle,
        setMenuActive,
        setPathname
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
