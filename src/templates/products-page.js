/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Footer from "~components/Footer";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { useMountEffect } from "~utils/hooks";
import { parseProducts } from "~utils/shopify";

const ProductsPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  const [products, setProducts] = useState([]);

  useMountEffect(() => {
    const parsedProducts = parseProducts(data);

    setProducts(parsedProducts);
  });

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

        {products.length > 0 && (
          <ul className="grid">
            {products.map(product => (
              <li key={product.handle} className="grid-end-4">
                <Link to={product.slug}>
                  <figure className="square overflow-hidden">
                    <img
                      className="w-full absolute transform-center"
                      src={product.images[0].originalSrc}
                      alt={product.handle}
                    />
                  </figure>

                  <h2 className="mt-4 f4">{product.title}</h2>
                  <h2 className="mt-4 f4">${product.variants[0].price}</h2>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Layout>

      <Footer />
    </>
  );
};

export default ProductsPage;

export const query = graphql`
  query ProductsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
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
