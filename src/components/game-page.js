import React from "react"
import { graphql } from "gatsby"
import Meta from "./meta";
import Layout from "./layout"

export default ({ data }) => {
    const post = data.markdownRemark
    return (
      <React.Fragment>
        <Meta title={post.frontmatter.title}></Meta>
        <Layout>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Layout>
      </React.Fragment>
    )
  }
  
  export const query = graphql`
    query($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        frontmatter {
          title
        }
      }
    }
  `