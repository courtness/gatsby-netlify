require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Valley Harvest`,
    titleTemplate: `%s - Valley Harvest`,
    description: `Valley Harvest is...`,
    keywords: `Valley,Harvest,keywords`,
    author: `Love + Money (dan@loveandmoney.agency)`,
    url: `https://www.valleyharvest.com`,
    image: `/images/site-image.svg`,
    twitterUsername: `@twitter`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Food Foundry`,
        short_name: `food-foundry`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
        // icon: `${__dirname}/src/assets/images/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-no-sourcemaps`
    },
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sass`,
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
