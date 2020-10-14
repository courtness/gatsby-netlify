import React from "react";
import { PropTypes } from "prop-types";

const Button = ({ children, className, color, onClick, transparent }) => {
  return (
    <button
      type="button"
      className={`button button--${color} ${
        transparent ? `button--transparent` : ``
      } ${className} relative block`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: ``,
  color: `white`,
  onClick: () => {},
  transparent: false
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  transparent: PropTypes.bool
};

export default Button;
