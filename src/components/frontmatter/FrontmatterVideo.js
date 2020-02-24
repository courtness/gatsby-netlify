/* eslint-disable react/prop-types */

import React from "react";

const FrontmatterVideo = ({ key, source }) => (
  <section key={key} className="grid">
    <div className="grid-end-12 my-8">
      <video className="w-full relative block" autoPlay loop muted playsInline>
        <source src={source} />
      </video>
    </div>
  </section>
);

export default FrontmatterVideo;
