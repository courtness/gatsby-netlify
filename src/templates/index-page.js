import React, { Component } from "react";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";

class IndexPageComponent extends Component {
  state = {
    mounted: false
  };

  //

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  //

  render() {
    return (
      <>
        <SEO
          title={this.props.frontmatter.title}
          description={this.props.frontmatter.description}
          keywords={this.props.frontmatter.keywords}
        />

        <Layout
          className={`index-page w-full relative flex-center ${
            this.state.mounted ? `mounted` : ``
          }`}
        >
          <h1 className="f1">{this.props.frontmatter.title}</h1>
        </Layout>
      </>
    );
  }
}

const IndexPage = ({ data }) => {
  const { siteMetadata: metadata } = data.site;
  const { frontmatter } = data.markdownRemark;

  return (
    <AppContext.Consumer>
      {appContext => (
        <IndexPageComponent
          frontmatter={frontmatter}
          appContext={appContext}
          metadata={metadata}
        />
      )}
    </AppContext.Consumer>
  );
};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        keywords
      }
    }
    site {
      siteMetadata {
        title
        description
        keywords
        author
        url
        image
        twitterUsername
      }
    }
  }
`;