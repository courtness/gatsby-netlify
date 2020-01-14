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

//
// Wordpress
/*
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


//
// Shopify
/*

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `);

  if (result.errors) {
    // eslint-disable-next-line no-console
    console.error(result.errors);
  }

  const { allShopifyProduct } = result.data;

  const shopifyProductTemplate = path.resolve(
    `./src/templates/shopify-product.js`
  );

  allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `products/${edge.node.handle}/`,
      component: slash(shopifyProductTemplate),
      context: {
        id: edge.node.id
      }
    });
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
