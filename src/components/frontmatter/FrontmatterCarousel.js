/* eslint-disable react/prop-types */

import React, { createRef, Component } from "react";
import Glide from "@glidejs/glide";
import Img from "gatsby-image";
import { uuid } from "uuidv4";
import { fancyWarning } from "~utils/helpers";

class FrontmatterCarouselComponent extends Component {
  glide;

  glideClass = `glide-${uuid()}`;

  glideRef = createRef();

  retryCount = 0;

  timeouts = [];

  componentDidMount() {
    this.mountCarousel();
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  //

  clearTimeouts = () => {
    this.timeouts.forEach(timeout => {
      clearTimeout(timeout);
    });
  };

  //

  mountCarousel = () => {
    if (this.glideRef.current) {
      this.glide = new Glide(`.${this.glideClass}`, {
        autoplay: 3000,
        gap: 0,
        perView: 1,
        type: `carousel`
      }).mount();
    }

    if (!this.glide) {
      this.retryCount += 1;

      if (this.retryCount > 20) {
        fancyWarning(`Glide mount retry threshold breached`);

        return;
      }

      this.timeouts.push(
        setTimeout(() => {
          this.mountCarousels();
        }, 100)
      );
    }
  };

  render() {
    const { key, images } = this.props;

    return (
      <section key={key} className="grid">
        <div className="grid-end-12 my-8">
          <div ref={this.glideRef} className={`glide ${this.glideClass}`}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {images.map((image, imageIndex) => {
                  const imagekey = `${key}-carousel-${imageIndex}`;

                  return (
                    <li key={imagekey} className="block">
                      <Img
                        className="w-full block"
                        fluid={image.childImageSharp.fluid}
                        alt="Carousel Item"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const FrontmatterCarousel = ({ key, images }) => (
  <FrontmatterCarouselComponent key={key} images={images} />
);

export default FrontmatterCarousel;
