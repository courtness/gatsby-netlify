/* eslint-disable react/prop-types */
import React, { useState } from "react";

const NotGlideCarousel = ({ items, className, itemWidth = `100%` }) => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [touchMove, setTouchMove] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  return (
    <section className={`not-glide-carousel ${className || `w-full relative`}`}>
      <ul
        className="not-glide-carousel__slides w-full relative flex items-start justify-start overflow-visible"
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
          const key = `carousel-item-${itemIndex}`;

          return (
            <li
              key={key}
              className="not-glide-carousel__slide transition-transform--slow relative"
              style={{
                transform: `translate3d(${activeCarouselIndex * -100}%, 0, 0)`,
                width: itemWidth
              }}
            >
              <div className="w-full relative block">{itemJSX}</div>
            </li>
          );
        })}
      </ul>

      <div className="not-glide-carousel__dots w-full flex items-center justify-center mt-8">
        <button
          type="button"
          className={`${
            activeCarouselIndex === 0 ? `opacity-1` : `opacity-50`
          } relative block mx-1 bg-white rounded-full`}
          onClick={() => setActiveCarouselIndex(0)}
        ></button>

        {new Array(items.length - 1).fill(0).map((_, itemIndex) => {
          const adjustedIndex = itemIndex + 1;
          const key = `gallery-bullet-${adjustedIndex}`;

          return (
            <button
              key={key}
              type="button"
              className={`${
                activeCarouselIndex === adjustedIndex
                  ? `opacity-1`
                  : `opacity-50`
              } relative block mx-1 bg-white rounded-full`}
              onClick={() => setActiveCarouselIndex(adjustedIndex)}
            ></button>
          );
        })}
      </div>
    </section>
  );
};

export default NotGlideCarousel;
