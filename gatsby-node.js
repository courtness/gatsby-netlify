/* eslint-disable no-console */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const chalk = require(`chalk`);
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { fmImagesToRelative } = require(`gatsby-remark-relative-images`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~assets": path.resolve(__dirname, `src/assets`),
        "~components": path.resolve(__dirname, `src/components`),
        "~context": path.resolve(__dirname, `src/context`),
        "~data": path.resolve(__dirname, `src/data`),
        "~node_modules": path.resolve(__dirname, `node_modules`),
        "~scss": path.resolve(__dirname, `src/scss`),
        "~utils": path.resolve(__dirname, `src/utils`),
        "~workers": path.resolve(__dirname, `src/workers`)
      }
    }
  });
};

//

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  switch (process.env.GATSBY_SOURCE_MODE) {
    case `shopify`:
      return graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  templateKey
                  shopifyHandle
                }
              }
            }
          }
          allShopifyProduct {
            edges {
              node {
                handle
                variants {
                  id
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
                id
                products {
                  alternative_id
                  handle
                  variants {
                    alternative_id
                    title
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          throw result.errors;
        }

        const { allMarkdownRemark, allShopifyAdminProduct } = result.data;

        allShopifyAdminProduct.edges.forEach(edge => {
          if (edge.node.id === `dummy`) {
            return;
          }

          edge.node.products.forEach(shopifyProduct => {
            const { handle } = shopifyProduct;
            const pagePath = `/products/${handle}`;

            let markdownId = ``;

            allMarkdownRemark.edges.forEach(({ node }) => {
              const { shopifyHandle } = node.frontmatter;

              if (handle === shopifyHandle) {
                markdownId = node.id;
              }
            });

            if (markdownId !== ``) {
              console.log(
                `${chalk.blue(
                  `createPages → shopify [markdown] |`
                )} ${pagePath}`
              );
            } else {
              console.log(
                `${chalk.green(
                  `createPages → shopify [defaults] |`
                )} ${pagePath}`
              );
            }

            createPage({
              path: pagePath,
              component: path.resolve(`src/templates/shopify-product-page.js`),
              context: {
                markdownId,
                handle
              }
            });
          });
        });

        allMarkdownRemark.edges.forEach(({ node }) => {
          const { id, frontmatter } = node;
          const { slug } = node.fields;

          if (!slug.startsWith(`/products/`) || slug === `/products/`) {
            createPage({
              path: slug,
              component: path.resolve(
                `src/templates/${String(frontmatter.templateKey)}.js`
              ),
              context: {
                id
              }
            });
          }
        });

        return true;
      });

    case `default`:
    default:
      return graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  templateKey
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          throw result.errors;
        }

        const { allMarkdownRemark } = result.data;

        allMarkdownRemark.edges.forEach(({ node }) => {
          const { id, frontmatter } = node;
          const { slug } = node.fields;

          if (!slug.startsWith(`/products/`) || slug === `/products/`) {
            createPage({
              path: slug,
              component: path.resolve(
                `src/templates/${String(frontmatter.templateKey)}.js`
              ),
              context: {
                id
              }
            });
          }
        });

        return true;
      });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
