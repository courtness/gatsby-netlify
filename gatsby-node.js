/* eslint-disable no-console */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

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

      createPage({
        path: slug,
        component: path.resolve(
          `src/templates/${String(frontmatter.templateKey)}.js`
        ),
        context: {
          id
        }
      });
    });

    return true;
  });
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
