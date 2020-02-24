/* eslint-disable react/prop-types */

import React from "react";
import Img from "gatsby-image";

const FrontmatterImage = ({ key, source }) => (
  <section key={key} className="grid">
    <div className="grid-end-12 my-8">
      <Img
        className="w-full block"
        fluid={source.childImageSharp.fluid}
        alt="Frontmatter Image"
      />
    </div>
  </section>
);

export default FrontmatterImage;
