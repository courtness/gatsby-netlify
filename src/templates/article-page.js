/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React from "react";
import { graphql } from "gatsby";
import DummyImage from "~components/DummyImage";
import Footer from "~components/Footer";
import InstagramGrid from "~components/InstagramGrid";
import Layout from "~components/Layout";
import Newsletter from "~components/Newsletter";
import SEO from "~components/SEO";

//

const ArticlePage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="article-page w-full relative">
        <DummyImage />

        <section className="grid">
          <h1 className="grid-end-12 my-8 f3">{frontmatter.title}</h1>

          <div
            className="grid-end-8"
            dangerouslySetInnerHTML={{ __html: frontmatter.content }}
          ></div>
        </section>

        <InstagramGrid />

        <Newsletter />
      </Layout>

      <Footer />
    </>
  );
};

export default ArticlePage;

export const query = graphql`
  query ArticlePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        content
        seoDescription
        seoKeywords
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "article-page" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
