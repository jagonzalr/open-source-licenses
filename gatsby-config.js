module.exports = {
  siteMetadata: {
    title: `Open Source Licences`,
    description: `Open Source Licences`,
    author: `Jose Antonio Gonzalez Rodriguez`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `open source licences`,
        short_name: `open source licences`,
        start_url: `/`,
        background_color: `#2e27f8`,
        theme_color: `#2e27f8`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`
  ],
}
