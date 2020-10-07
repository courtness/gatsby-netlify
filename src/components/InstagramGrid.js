import React from "react";
import PropTypes from "prop-types";

import wireframe from "~assets/images/wireframe.png";

const InstagramGrid = ({ heading }) => {
  const instagramImages = [
    {
      image: wireframe,
      url: `https://www.instagram.com`
    },
    {
      image: wireframe,
      url: `https://www.instagram.com`
    },
    {
      image: wireframe,
      url: `https://www.instagram.com`
    },
    {
      image: wireframe,
      url: `https://www.instagram.com`
    },
    {
      image: wireframe,
      url: `https://www.instagram.com`
    },
    {
      image: wireframe,
      url: `https://www.instagram.com`
    },
    {
      image: wireframe,
      url: `https://www.instagram.com`
    },
    {
      image: wireframe,
      url: `https://www.instagram.com`
    }
  ];

  return (
    <section className="w-full relative pt-24 pb-24">
      <header className="grid">
        <h3 className="grid-end-12 mb-12 f3">{heading}</h3>
      </header>

      {instagramImages?.[0] && (
        <ul className="grid">
          {instagramImages.map((instagramImage, instagramImageIndex) => {
            const key = `instagram-grid-${instagramImageIndex}`;

            return (
              <li key={key} className="grid-end-3">
                <a
                  href={instagramImage.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-full relative block mb-1"
                >
                  <figure className="square overflow-hidden">
                    <img
                      className="w-full h-full absolute transform-center border"
                      src={instagramImage.image}
                      alt="Instagram Sample"
                    />
                  </figure>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

InstagramGrid.defaultProps = {
  heading: `Instagram`
};

InstagramGrid.propTypes = {
  heading: PropTypes.string
};

export default InstagramGrid;
