module.exports = {
    plugins: [
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