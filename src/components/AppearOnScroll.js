/* eslint-disable react/prop-types */

import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DocumentContext } from "~context/DocumentContext";

const AppearOnScroll = ({ children, once }) => {
  const documentContext = useContext(DocumentContext);
  const containerRef = useRef();
  const [visible, setVisible] = useState(false);
  const { windowHeight } = documentContext;

  if (containerRef && containerRef.current) {
    const { height, top } = containerRef.current.getBoundingClientRect();

    if (top > -height && top < windowHeight) {
      if (!visible) {
        setVisible(true);
      }
    } else if (visible && !once) {
      setVisible(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`${
        visible ? `animation-appear` : `invisible`
      } animation-delay-2`}
    >
      {children}
    </div>
  );
};

AppearOnScroll.defaultProps = {
  once: false
};

AppearOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  once: PropTypes.bool
};

export default AppearOnScroll;
