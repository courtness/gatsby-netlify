import React, { useContext } from "react";
import PropTypes from "prop-types";
import Plx from "react-plx";
import { DocumentContext } from "~context/DocumentContext";

const Parallaxer = ({ atTop, children, className, visible }) => {
  const documentContext = useContext(DocumentContext);
  const { windowHeight } = documentContext;

  let startValue = windowHeight * 0.05;
  let endValue = windowHeight * -0.05;

  if (atTop) {
    startValue = 0;
    endValue = windowHeight * -0.1;
  }

  return (
    <>
      {visible && (
        <Plx
          className={className}
          parallaxData={[
            {
              start: `self`,
              duration: windowHeight * 2 || 1,
              properties: [
                {
                  startValue,
                  endValue,
                  property: `translateY`
                }
              ]
            }
          ]}
        >
          {children}
        </Plx>
      )}
    </>
  );
};

Parallaxer.defaultProps = {
  atTop: false,
  className: ``,
  visible: true
};

Parallaxer.propTypes = {
  atTop: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  visible: PropTypes.bool
};

export default Parallaxer;
