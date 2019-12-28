import React, { Component } from "react";
import { PropTypes } from "prop-types";
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
    const { frontmatter } = this.props.data.markdownRemark;

    return (
      <>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.keywords}
        />

        <Layout
          className={`index-page w-full relative pt-12 ${
            this.state.mounted ? `mounted` : ``
          }`}
        >
          <h1 className="f1">{frontmatter.title}</h1>
        </Layout>
      </>
    );
  }
}

IndexPageComponent.defaultProps = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: `Home`,
        description: ``,
        keywords: ``
      }
    }
  }
};

IndexPageComponent.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string
      })
    })
  })
};

const IndexPage = props => {
  return (
    <AppContext.Consumer>
      {appContext => <IndexPageComponent appContext={appContext} {...props} />}
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
  }
`;
