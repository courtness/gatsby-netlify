import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { DocumentContext } from "~context/DocumentContext";

const ScreenHeight = ({ children, className }) => {
  const { windowHeight, windowWidth } = useContext(DocumentContext);

  useEffect(() => {
    if (typeof window === `undefined` || typeof document === `undefined`) {
      return;
    }

    document.documentElement.style.setProperty(
      `--vh`,
      `${windowHeight * 0.01}px`
    );
  }, [windowHeight, windowWidth]);

  //

  return <section className={`screen-height ${className}`}>{children}</section>;
};

ScreenHeight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};

export default ScreenHeight;
