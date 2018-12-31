module.exports = {
    siteMetadata: {
        url: "http://extreme-wiki.roman-guivan.online"
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-typography`,
            options: {
              pathToConfigModule: `src/typography.js`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `content`,
              path: `${__dirname}/src/markdown`,
            },
        },
        `gatsby-transformer-remark`
    ],
}