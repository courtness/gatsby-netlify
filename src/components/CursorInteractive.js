import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "~context/AppContext";

const CursorInteractive = ({ children, mode, text }) => {
  const { setCursorMode, setCursorText } = useContext(AppContext);

  return (
    <div
      role="presentation"
      onMouseEnter={() => {
        setCursorMode(mode);
        setCursorText(text);
      }}
      onMouseLeave={() => {
        setCursorMode(null);
        setCursorText(null);
      }}
    >
      {children}
    </div>
  );
};

CursorInteractive.propTypes = {
  children: PropTypes.node.isRequired,
  mode: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default CursorInteractive;
