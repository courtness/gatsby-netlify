import React from "react";
import PropTypes from "prop-types";

const Button = ({ className, color, onClick, text, transparent }) => (
  <button
    type="button"
    className={`button button--${color} ${
      transparent ? `button--transparent` : ``
    } ${className} relative py-4 caption uppercase`}
    onClick={onClick}
  >
    {text}
  </button>
);

Button.defaultProps = {
  color: ``,
  className: ``,
  onClick: () => {},
  text: `Button`,
  transparent: false
};

Button.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  transparent: PropTypes.bool
};

export default Button;
