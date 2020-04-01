/* eslint-disable react/prop-types */

import React, { Component, useContext } from "react";
import { PropTypes } from "prop-types";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Footer from "~components/Footer";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import FrontmatterBuilder from "~components/frontmatter/FrontmatterBuilder";
import { fancyLog } from "~utils/helpers";

class IndexPageComponent extends Component {
  componentDidMount() {
    fancyLog(`Index page`);
  }

  //

  render() {
    const { frontmatter, location } = this.props;

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />

        <Layout className="index-page w-full relative flex flex-col justify-between pt-16">
          <section className="grid">
            <h1 className="grid-end-12 my-8 f3">{frontmatter.title}</h1>
          </section>

          <FrontmatterBuilder components={frontmatter.components} />

          <Footer />
        </Layout>
      </>
    );
  }
}

// TODO : home-1.jpg, components, carousels
IndexPageComponent.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    seoDescription: PropTypes.string,
    seoKeywords: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

//

const IndexPage = ({ data, location }) => {
  const appContext = useContext(AppContext);
  const { frontmatter } = data.markdownRemark;

  return (
    <IndexPageComponent
      appContext={appContext}
      frontmatter={frontmatter}
      location={location}
    />
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({})
    })
  }).isRequired,
  location: PropTypes.shape({}).isRequired
};

export default IndexPage;

export const query = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        components {
          type
          carouselImages {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          imageSource {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          videoURL
        }
        seoDescription
        seoKeywords
      }
    }
  }
`;
