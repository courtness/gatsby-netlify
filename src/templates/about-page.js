/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React from "react";
import { graphql } from "gatsby";
import DummyImage from "~components/DummyImage";
import InstagramGrid from "~components/InstagramGrid";
import Footer from "~components/Footer";
import Layout from "~components/Layout";
import Newsletter from "~components/Newsletter";
import SEO from "~components/SEO";

const AboutPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="about-page w-full relative">
        <DummyImage />

        <section className="grid pt-12 pb-24">
          <header className="grid-end-10">
            <h2 className="f2">A branded headline with on-point messaging</h2>
            <p className="mt-12 mb-16 f5">
              Digital branding is about finding the balance between
              forward-thinking and real-time reaction.
            </p>
          </header>

          <article className="grid-end-6">
            <h4 className="mb-3 f5">KEY MESSAGING 1</h4>
            <p className="b1">
              Just like your business, we see brands as a constant work in
              progress. Always testing. Always building. Always evolving. Always
              Beta. Ours is a constant, iterative and collaborative process of
              research, creation, building, testing, and improving. Investing
              enough time, energy, love and money to make sure you’re ready to
              grow.
            </p>
          </article>

          <article className="grid-end-6">
            <h4 className="mb-3 f5">KEY MESSAGING 1</h4>
            <p className="b1">
              Just like your business, we see brands as a constant work in
              progress. Always testing. Always building. Always evolving. Always
              Beta. Ours is a constant, iterative and collaborative process of
              research, creation, building, testing, and improving. Investing
              enough time, energy, love and money to make sure you’re ready to
              grow.
            </p>
          </article>
        </section>

        <InstagramGrid heading="Instagram" />

        <Newsletter heading="Instagram" />
      </Layout>

      <Footer />
    </>
  );
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
