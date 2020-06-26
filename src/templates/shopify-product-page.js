/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React from "react";
import { graphql } from "gatsby";
import Footer from "~components/Footer";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { getProductByHandle, parseProducts } from "~utils/shopify";

const ProductPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const product = getProductByHandle(
    frontmatter.shopifyHandle,
    parseProducts(data)
  );

  console.log(product);

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="products-page w-full relative pt-12">
        <section className="grid">
          <h1 className="grid-end-12 my-8 f3">{frontmatter.title}</h1>
        </section>
      </Layout>

      <Footer />
    </>
  );
};

export default ProductPage;

export const query = graphql`
  query ShopifyProductPage($handle: String!, $markdownId: String!) {
    markdownRemark(id: { eq: $markdownId }) {
      fields {
        slug
      }
      frontmatter {
        title
        shopifyHandle
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      images {
        originalSrc
      }
      productType
      vendor
      variants {
        id
        title
        image {
          originalSrc
        }
        price
        selectedOptions {
          name
          value
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            shopifyHandle
          }
        }
      }
    }
    allShopifyProduct {
      edges {
        node {
          id
          title
          description
          handle
          images {
            originalSrc
          }
          productType
          vendor
          variants {
            id
            title
            image {
              originalSrc
            }
            price
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
    allShopifyAdminProduct {
      edges {
        node {
          products {
            handle
            variants {
              alternative_id
            }
          }
        }
      }
    }
  }
`;
