import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import { getWindowDimensions } from "~utils/dom";

export const CursorContext = createContext({});

const CursorProvider = ({ children }) => {
  const [cursorCenterDeltaX, setCursorCenterDeltaX] = useState(0);
  const [cursorCenterDeltaY, setCursorCenterDeltaY] = useState(0);
  const [cursorPositionX, setCursorPositionX] = useState(0);
  const [cursorPositionY, setCursorPositionY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  //

  const handleMousemove = e => {
    setCursorCenterDeltaX(-(0.5 - e.pageX / windowWidth));
    setCursorCenterDeltaY(
      -(0.5 - (e.pageY - window.pageYOffset) / windowHeight)
    );
    setCursorPositionX(e.pageX);
    setCursorPositionY(e.pageY - window.pageYOffset);
  };

  const handleResize = () => {
    setWindowHeight(getWindowDimensions().height);
    setWindowWidth(getWindowDimensions().width);
  };

  //

  useEffect(() => {
    if (typeof document !== `undefined` && document?.addEventListener) {
      document.addEventListener(
        `mousemove`,
        _.throttle(handleMousemove),
        false
      );
    }

    if (typeof window !== `undefined` && window?.addEventListener) {
      window.addEventListener(`resize`, _.throttle(handleResize), false);

      handleResize();
    }
  }, []);

  //

  return (
    <CursorContext.Provider
      value={{
        cursorCenterDeltaX,
        cursorCenterDeltaY,
        cursorPositionX,
        cursorPositionY,
        windowWidth,
        windowHeight
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

CursorProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CursorProvider;
