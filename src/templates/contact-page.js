import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";

class ContactPageComponent extends Component {
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
          className={`contact-page w-full relative flex-center ${
            this.state.mounted ? `mounted` : ``
          }`}
        >
          <h1 className="f1">{frontmatter.title}</h1>
        </Layout>
      </>
    );
  }
}

ContactPageComponent.defaultProps = {
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

ContactPageComponent.propTypes = {
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

const ContactPage = props => {
  return (
    <AppContext.Consumer>
      {appContext => (
        <ContactPageComponent appContext={appContext} {...props} />
      )}
    </AppContext.Consumer>
  );
};

export default ContactPage;

export const query = graphql`
  query contactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        keywords
      }
    }
  }
`;
