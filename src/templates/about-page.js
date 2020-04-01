/* eslint-disable react/prop-types */

import React, { Component, useContext } from "react";
import { PropTypes } from "prop-types";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Footer from "~components/Footer";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { fancyLog } from "~utils/helpers";

class AboutPageComponent extends Component {
  componentDidMount() {
    fancyLog(`About page`);
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

        <Layout className="contact-page w-full relative flex flex-col justify-between pt-12">
          <section className="grid">
            <h1 className="grid-end-12 my-8 f3">{frontmatter.title}</h1>
          </section>

          <Footer />
        </Layout>
      </>
    );
  }
}

AboutPageComponent.propTypes = {
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

const AboutPage = ({ data, location }) => {
  const appContext = useContext(AppContext);
  const { frontmatter } = data.markdownRemark;

  return (
    <AboutPageComponent
      appContext={appContext}
      frontmatter={frontmatter}
      location={location}
    />
  );
};

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({})
    })
  }).isRequired,
  location: PropTypes.shape({}).isRequired
};

export default AboutPage;

export const query = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
      }
    }
  }
`;
