import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DocumentContext } from "~context/DocumentContext";

const ScreenHeight = ({ children, className }) => {
  const { windowHeight, windowWidth } = useContext(DocumentContext);
  const [height, setHeight] = useState(`100vh`);

  useEffect(() => {
    if (typeof window === `undefined`) {
      return;
    }

    setHeight(document?.documentElement?.clientHeight || window.innerHeight);
  }, [windowHeight, windowWidth]);

  //

  return (
    <section className={className} style={{ height }}>
      {children}
    </section>
  );
};

ScreenHeight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};

export default ScreenHeight;
