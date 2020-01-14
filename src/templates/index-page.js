import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
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

        <Layout className="index-page w-full relative">
          <h1 className="f1">{frontmatter.title}</h1>
        </Layout>
      </>
    );
  }
}

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
  const { frontmatter } = data.markdownRemark;

  return (
    <AppContext.Consumer>
      {appContext => (
        <IndexPageComponent
          appContext={appContext}
          frontmatter={frontmatter}
          location={location}
        />
      )}
    </AppContext.Consumer>
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
        seoDescription
        seoKeywords
      }
    }
  }
`;
