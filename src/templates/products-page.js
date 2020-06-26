/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React from "react";
import { graphql, Link } from "gatsby";
import animejs from "animejs";
import TransitionLink from "gatsby-plugin-transition-link";
import Footer from "~components/Footer";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { parseProducts } from "~utils/shopify";

const ProductsPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  const products = parseProducts(data);

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
                <TransitionLink
                  to={product.slug}
                  className="block"
                  exit={{
                    length: 1,
                    trigger: ({ node, e, exit, entry }) => {
                      const item = node.querySelector(`.layout`);
                      const bg = document.querySelector(
                        `#layout-background-example`
                      );
                      const bgTranslateValue = [`100vw`, `0`];
                      const pageTranslateValue = [`0%`, `-33%`];

                      return animejs
                        .timeline({
                          duration: 1000,
                          easing: `easeInOutCubic`
                        })
                        .add({
                          targets: [item],
                          translateX: pageTranslateValue
                        })
                        .add(
                          {
                            targets: [bg],
                            translateX: bgTranslateValue
                          },
                          0
                        );
                    }
                  }}
                  entry={{
                    delay: 1,
                    length: 0.75,
                    trigger: ({ node, e, exit, entry }) => {
                      const item = node.querySelector(`.layout`);
                      const bg = document.querySelector(
                        `#layout-background-example`
                      );

                      const bgTranslateValue = [`0`, `-100vw`];
                      const pageTranslateValue = [`100%`, `0%`];

                      return animejs
                        .timeline({
                          duration: 750,
                          easing: `easeInOutCubic`
                        })
                        .add({
                          targets: [item],
                          translateX: pageTranslateValue
                        })
                        .add(
                          {
                            targets: [bg],
                            translateX: bgTranslateValue
                          },
                          0
                        );
                    }
                  }}
                >
                  <figure className="square overflow-hidden">
                    <img
                      className="w-full absolute transform-center"
                      src={product.images[0].originalSrc}
                      alt={product.handle}
                    />
                  </figure>

                  <h2 className="mt-4 f4">{product.title}</h2>
                  <h2 className="mt-4 f4">${product.variants[0].price}</h2>
                </TransitionLink>
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
          }
        }
      }
    }
  }
`;
// export const query = graphql`
//   query ProductsPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       frontmatter {
//         title
//       }
//     }
//     allMarkdownRemark {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             shopifyHandle
//           }
//         }
//       }
//     }
//     allShopifyProduct {
//       edges {
//         node {
//           id
//           title
//           description
//           handle
//           images {
//             originalSrc
//           }
//           productType
//           vendor
//           variants {
//             id
//             title
//             image {
//               originalSrc
//             }
//             price
//             selectedOptions {
//               name
//               value
//             }
//           }
//         }
//       }
//     }
//     allShopifyAdminProduct {
//       edges {
//         node {
//           products {
//             handle
//             variants {
//               alternative_id
//             }
//           }
//         }
//       }
//     }
//   }
// `;
