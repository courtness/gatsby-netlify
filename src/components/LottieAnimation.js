import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import lottieAnimationLoader from "~workers/animation.worker";

const LottieAnimation = ({
  animationData,
  animationOptions,
  className,
  completeCallback,
  doLoad,
  enterFrameCallback,
  id
}) => {
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (doLoad && ref.current && !loaded) {
      setLoaded(true);

      lottieAnimationLoader(id, animationData, animationOptions).then(
        loadedAnimation => {
          loadedAnimation.addEventListener(`complete`, completeCallback);
          loadedAnimation.addEventListener(`enterFrame`, enterFrameCallback);
        }
      );
    }
  }, [doLoad, ref.current]);

  return <div id={id} ref={ref} className={className} />;
};

LottieAnimation.defaultProps = {
  animationOptions: {},
  completeCallback: () => {},
  enterFrameCallback: () => {},
  className: ``,
  doLoad: false
};

LottieAnimation.propTypes = {
  animationData: PropTypes.shape({}).isRequired,
  animationOptions: PropTypes.shape({}),
  className: PropTypes.string,
  completeCallback: PropTypes.func,
  doLoad: PropTypes.bool,
  enterFrameCallback: PropTypes.func,
  id: PropTypes.string.isRequired
};

export default LottieAnimation;
