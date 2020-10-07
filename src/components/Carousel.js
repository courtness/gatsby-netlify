import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Carousel = ({
  align,
  autoPlay,
  className,
  dotColor,
  items,
  itemWidth,
  keyPrefix,
  withDots
}) => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [touchMove, setTouchMove] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  //

  useEffect(() => {
    if (!autoPlay || Number.isNaN(autoPlay) || autoPlay <= 0) {
      return;
    }

    setInterval(() => {
      setActiveCarouselIndex(oldIndex => (oldIndex + 1) % items.length);
    }, autoPlay);
  }, []);

  //

  if (!items?.[0]) {
    return <Fragment key={`${keyPrefix}-stub`}></Fragment>;
  }

  //

  return (
    <section
      key={`${keyPrefix}-container`}
      className={`carousel ${className || `w-full relative`} overflow-x-hidden`}
    >
      <ul
        className="carousel__slides w-full relative flex items-stretch justify-start overflow-visible"
        onTouchEnd={() => {
          if (!touchStart || !touchMove) {
            return;
          }

          // TODO gesture transforms under the index move threshold

          const touchDiff = [
            touchStart[0] - touchMove[0],
            touchStart[1] - touchMove[1]
          ];

          if (touchDiff[0] < -90) {
            setActiveCarouselIndex(oldIndex =>
              oldIndex - 1 < 0 ? items.length - oldIndex - 1 : oldIndex - 1
            );
          } else if (touchDiff[0] > 90) {
            setActiveCarouselIndex(oldIndex => (oldIndex + 1) % items.length);
          }

          setTouchMove(null);
          setTouchStart(null);
        }}
        onTouchMove={e => {
          e.stopPropagation();

          const touchEvent = e?.changedTouches?.[0] ? e.changedTouches[0] : e;

          setTouchMove([touchEvent.clientX, touchEvent.clientY]);

          return false;
        }}
        onTouchStart={e => {
          const touchEvent = e?.changedTouches?.[0] ? e.changedTouches[0] : e;

          setTouchStart([touchEvent.clientX, touchEvent.clientY]);

          return false;
        }}
      >
        {items.map((itemJSX, itemIndex) => {
          const key = `${keyPrefix}-item-${itemIndex}`;

          return (
            <li
              key={key}
              className={`carousel__slide transition-transform-slow relative ${
                align === `center` ? `flex items-center justify-center` : ``
              }`}
              style={{
                width: itemWidth,
                flex: `0 0 auto`,
                transform: `translate3d(${activeCarouselIndex * -100}%, 0, 0)`
              }}
            >
              <div className="w-full relative block">{itemJSX}</div>
            </li>
          );
        })}
      </ul>

      {withDots && (
        <div className="carousel__dots w-full absolute bottom-0 right-0 left-0 z-10 mb-6 flex items-center justify-center">
          <button
            type="button"
            className={`${
              activeCarouselIndex === 0 ? `opacity-1` : `opacity-50`
            } w-2 h-2 relative block mx-1 bg-${dotColor} rounded-full`}
            onClick={() => setActiveCarouselIndex(0)}
          ></button>

          {new Array(items.length - 1).fill(0).map((_, itemIndex) => {
            const adjustedIndex = itemIndex + 1;
            const key = `${keyPrefix}-bullet-${adjustedIndex}`;

            return (
              <button
                key={key}
                type="button"
                className={`${
                  activeCarouselIndex === adjustedIndex
                    ? `opacity-1`
                    : `opacity-50`
                } w-2 h-2 relative block mx-1 bg-${dotColor} rounded-full`}
                onClick={() => setActiveCarouselIndex(adjustedIndex)}
              ></button>
            );
          })}
        </div>
      )}
    </section>
  );
};

Carousel.defaultProps = {
  align: `start`,
  autoPlay: null,
  className: ``,
  dotColor: `white`,
  itemWidth: `100%`,
  keyPrefix: `carousel-item`,
  withDots: false
};

Carousel.propTypes = {
  align: PropTypes.string,
  autoPlay: PropTypes.number,
  className: PropTypes.string,
  dotColor: PropTypes.string,
  items: PropTypes.node.isRequired,
  itemWidth: PropTypes.string,
  keyPrefix: PropTypes.string,
  withDots: PropTypes.bool
};

export default Carousel;
