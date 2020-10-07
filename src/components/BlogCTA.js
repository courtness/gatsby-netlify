import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { DocumentContext } from "~context/DocumentContext";
import Button from "~components/Button";

import wireframe from "~assets/images/wireframe.png";

const BlogCTA = ({ align, content, image }) => {
  const { device } = useContext(DocumentContext);

  return (
    <section className="w-full relative">
      <article className="grid">
        {((device && device === `mobile`) || align === `left`) && (
          <div className="grid-end-6 xs:grid-end-12">
            <figure className="square">
              <img
                className="w-full h-full absolute transform-center"
                src={image || wireframe}
                alt="Source"
              />
            </figure>
          </div>
        )}

        <div className="grid-end-6 flex flex-col items-center justify-center pt-24 pb-24 px-12 sm:px-0">
          <h4 className="f2 text-center">{content}</h4>

          <Link to="/blog">
            <Button color="black" className="w-48 mt-12" text="View Blog" />
          </Link>
        </div>

        {device !== `mobile` && align === `right` && (
          <div className="grid-end-6 xs:grid-end-12">
            <figure className="square">
              <img
                className="w-full h-full absolute transform-center"
                src={image || wireframe}
                alt="Source"
              />
            </figure>
          </div>
        )}
      </article>
    </section>
  );
};

BlogCTA.defaultProps = {
  align: `left`,
  content: ``,
  image: null
};

BlogCTA.propTypes = {
  align: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.shape({})
};

export default BlogCTA;
