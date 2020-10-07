import React from "react";
import { PropTypes } from "prop-types";

const Button = ({ children, className, color, transparent }) => {
  return (
    <button
      type="button"
      className={`button button--${color} ${
        transparent ? `button--transparent` : ``
      } ${className} relative block`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: ``,
  color: `white`,
  transparent: false
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  transparent: PropTypes.bool
};

export default Button;
