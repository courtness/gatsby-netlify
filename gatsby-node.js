/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

//
// JS keyword path resolution

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
        "~node_modules": path.resolve(__dirname, `node_modules`),
        "~scss": path.resolve(__dirname, `src/scss`),
        "~utils": path.resolve(__dirname, `src/utils`)
      }
    }
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
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

    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach(edge => {
      const { id } = edge.node;

      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        context: {
          id
        }
      });
    });

    return true;
  });
};

/*
// Wordpress

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    // eslint-disable-next-line no-console
    console.error(result.errors);
  }

  const { allWordpressPost } = result.data;

  const postTemplate = path.resolve(`./src/templates/wordpress-post.js`);

  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id
      }
    });
  });
};
*/

/*
// Shopify

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

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
              handle
              templateKey
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

    // Creates product pages

    allMarkdownRemark.edges.forEach(markdownEdge => {
      const { frontmatter } = markdownEdge.node;

      let inShopify = false;
      let multiVariant = false;

      allShopifyAdminProduct.edges.forEach(edge => {
        if (edge.node.id !== `dummy`) {
          edge.node.products.forEach(shopifyProduct => {
            if (inShopify && multiVariant) {
              return;
            }

            if (frontmatter.handle === shopifyProduct.handle) {
              inShopify = true;

              if (shopifyProduct.variants.length >= 2) {
                multiVariant = true;
              }
            }
          });
        }
      });

      createPage({
        path: markdownEdge.node.fields.slug,
        component: path.resolve(`src/templates/shopify-product-page.js`),
        context: {
          handle: frontmatter.handle,
          id: markdownEdge.node.id,
          inShopify,
          multiVariant
        }
      });
    });

    // Creates all the other pages

    allMarkdownRemark.edges.forEach(edge => {
      const { id } = edge.node;
      const { slug } = edge.node.fields;

      if (!slug.startsWith(`/products/`) || slug === `/products/`) {
        createPage({
          path: slug,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          context: {
            id
          }
        });
      }
    });

    return true;
  });
};
*/

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
