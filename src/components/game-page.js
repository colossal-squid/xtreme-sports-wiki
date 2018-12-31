import React from "react"
import { graphql } from "gatsby"
import Meta from "./meta";
import Layout from "./layout"
import FacebookComments from "./fb-comments-box"

export default ({data}) => {
    const post = data.markdownRemark;
    const url = data.site.siteMetadata.url + post.fields.slug;
    return (
      <React.Fragment>
        <Meta title={post.frontmatter.title}></Meta>
        <Layout>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <h3>Comments</h3>
            <FacebookComments enabled={true} url={url}>
            </FacebookComments>
        </Layout>
      </React.Fragment>
    )
  }
  
  export const query = graphql`
    query($slug: String!) {
      site {
        siteMetadata {
          url
        }
      },
      markdownRemark(fields: { slug: { eq: $slug } }) {
        html,
        fields {
          slug
        },
        frontmatter {
          title
        }
      }
    }
  `