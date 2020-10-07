import React from "react";

import wireframe from "~assets/images/wireframe.png";

const DummyImage = () => (
  <section className="sixteen-by-nine animation-appear animation-delay-2 w-full relative flex items-center justify-center">
    <img
      className="w-full h-full relative block"
      src={wireframe}
      alt="Wireframe"
    />
  </section>
);

export default DummyImage;
