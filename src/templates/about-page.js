import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";

class AboutPageComponent extends Component {
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
          className={`about-page w-full relative flex-center ${
            this.state.mounted ? `mounted` : ``
          }`}
        >
          <h1 className="f1">{frontmatter.title}</h1>
        </Layout>
      </>
    );
  }
}

AboutPageComponent.defaultProps = {
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

AboutPageComponent.propTypes = {
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

const AboutPage = props => {
  return (
    <AppContext.Consumer>
      {appContext => <AboutPageComponent appContext={appContext} {...props} />}
    </AppContext.Consumer>
  );
};

export default AboutPage;

export const query = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        keywords
      }
    }
  }
`;
