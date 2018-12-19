module.exports = {
    plugins: [
        `gatsby-plugin-typography`,
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