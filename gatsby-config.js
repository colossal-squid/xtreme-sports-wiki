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
        `gatsby-transformer-remark`,
        {
            resolve: 'gatsby-plugin-copy-files',
            options: {
                source: `${__dirname}/src/markdown/static`,
                destination: '/'
            }
        },
        // make sure to put last in the array
        {resolve: `gatsby-plugin-netlify`}
    ]
}