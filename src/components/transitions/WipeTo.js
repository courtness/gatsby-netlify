/* eslint-disable react/prop-types */

// import React, { useContext } from "react";
import React from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import TransitionLink from "gatsby-plugin-transition-link";

const WipeTo = ({
  backgroundId,
  className,
  children,
  direction,
  id,
  onClick,
  to
}) => {
  const entryLength = 600;
  const exitLength = 600;

  return (
    <TransitionLink
      id={id}
      to={to}
      className={className}
      onClick={onClick}
      exit={{
        length: exitLength * 0.001,
        trigger: ({ node, e, exit, entry }) => {
          const layout = document.querySelector(`#layout`);
          const bg = document.querySelector(
            `#layout-background-${backgroundId}`
          );

          const bgTranslateValue = [
            `${direction === `<` ? `-` : ``}100vw`,
            `0`
          ];
          const pageTranslateValue = [
            `0`,
            `${direction === `<` ? `` : `-`}50vw`
          ];

          return anime
            .timeline({
              duration: exitLength,
              easing: `easeInCubic`
            })
            .add({
              targets: layout,
              translateX: pageTranslateValue
            })
            .add(
              {
                targets: bg,
                translateX: bgTranslateValue
              },
              0
            );
        }
      }}
      entry={{
        delay: exitLength * 0.001,
        length: entryLength * 0.001,
        trigger: ({ node, e, exit, entry }) => {
          const layout = document.querySelector(`#layout`);
          const bg = document.querySelector(
            `#layout-background-${backgroundId}`
          );
          const bgTranslateValue = [
            `0`,
            `${direction === `<` ? `` : `-`}100vw`
          ];
          const pageTranslateValue = [
            `${direction === `<` ? `-` : ``}100vw`,
            `0%`
          ];

          return anime
            .timeline({
              duration: entryLength,
              easing: `easeOutCubic`
            })
            .add({
              targets: layout,
              translateX: pageTranslateValue
            })
            .add(
              {
                targets: bg,
                translateX: bgTranslateValue
              },
              0
            );
        }
      }}
    >
      {children}
    </TransitionLink>
  );
};

WipeTo.defaultProps = {
  backgroundId: `default`,
  className: ``,
  direction: `>`,
  onClick: () => {}
};

WipeTo.propTypes = {
  backgroundId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired
};

export default WipeTo;
