import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

export default ({data}) => (
  <Layout>
   <h1> Extreme games alphabetically</h1>
   <ul>
       { data.allMarkdownRemark.edges.map(edge=>(
            <li><a href="#" dangerouslySetInnerHTML={{ __html: edge.node.frontmatter.title}}></a></li>
        ))
       }
   </ul>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          excerpt
        }
      }
    }
  }
`