require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

const autoprefixer = require(`autoprefixer`);
const tailwindCss = require(`tailwindcss`)(`./tailwind.config.js`);

module.exports = {
  siteMetadata: {
    title: `Site Title`,
    titleTemplate: `%s - Site Title`,
    description: `Site Title is...`,
    keywords: `Site,keywords`,
    author: `danielcourtness@gmail.com`,
    url: ``,
    image: `/images/site-image.svg`,
    twitterUsername: `@twitter`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Site Title`,
        short_name: `site-title`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/assets/images/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-no-sourcemaps`
    },
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [autoprefixer, tailwindCss]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        // develop: true,
        tailwind: true,
        whitelistPatterns: [/glide/]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/uploads`,
        name: `uploads`
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: `pages`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets/images`,
        name: `images`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
              sizeByPixelDensity: true,
              withWebp: true
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/static`
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify`
  ]
};
