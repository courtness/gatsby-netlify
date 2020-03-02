/* eslint-disable react/prop-types */

import React from "react";
import FrontmatterCarousel from "~components/frontmatter/FrontmatterCarousel";
import FrontmatterImage from "~components/frontmatter/FrontmatterImage";
import FrontmatterVideo from "~components/frontmatter/FrontmatterVideo";

const FrontmatterBuilder = ({ components }) => (
  <>
    {components &&
      components.length > 0 &&
      components.map((component, index) => {
        // TODO classNames, propTypes, better identifier

        const key = `section-${index}`;

        let componentJSX;

        switch (component.type) {
          case `carousel`:
            componentJSX = (
              <FrontmatterCarousel
                key={key}
                images={component.carouselImages}
              ></FrontmatterCarousel>
            );

            break;

          case `image`:
            componentJSX = (
              <FrontmatterImage
                key={key}
                source={component.imageSource}
              ></FrontmatterImage>
            );

            break;

          case `video`:
            componentJSX = (
              <FrontmatterVideo
                key={key}
                source={component.videoURL}
              ></FrontmatterVideo>
            );

            break;

          default:
            componentJSX = <></>;
            break;
        }

        return componentJSX;
      })}
  </>
);

export default FrontmatterBuilder;
