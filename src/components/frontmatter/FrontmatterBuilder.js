/* eslint-disable react/prop-types */

import React from "react";
import FrontmatterCarousel from "~components/frontmatter/FrontmatterCarousel";
import FrontmatterSimpleImage from "~components/frontmatter/FrontmatterSimpleImage";
import FrontmatterVideo from "~components/frontmatter/FrontmatterVideo";

const FrontmatterBuilder = ({ components }) => (
  <>
    {components &&
      components.length > 0 &&
      components.map((component, index) => {
        const key = `section-${index}`; // TODO: some other identifier

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

          case `simpleImage`:
            componentJSX = (
              <FrontmatterSimpleImage
                key={key}
                source={component.simpleImageSource}
              ></FrontmatterSimpleImage>
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
