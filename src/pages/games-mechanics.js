import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

export default ({data}) => (
  <Layout>
   <h1> Extreme games by mechanics</h1>
   <ul><h2>Tony Hawks Pro Skater / Underground "inspired" games</h2>
       { formatGames(data, 'thps') }
   </ul>
   <ul><h2>SSX "inspired" games</h2>
      { formatGames(data, 'ssx') }
   </ul>
   <ul><h2>Games with rather unique mechanics</h2>
       { formatGames(data, 'other') }
   </ul>
   <ul><h2>Games that need closer investigation (didnt check em yet)</h2>
       { formatGames(data, undefined) }
   </ul>
  </Layout>
)

function formatGames(data, mechanic) {
    return data.allMarkdownRemark.edges.filter(edge=>(mechanic && edge.node.frontmatter.mechanics === mechanic) || (!mechanic && !edge.node.frontmatter.mechanics )).map(edge=>(
        <li><a href="#" dangerouslySetInnerHTML={{ __html: edge.node.frontmatter.title}}></a></li>
    ))
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title,
            mechanics
          }
          excerpt
        }
      }
    }
  }
`