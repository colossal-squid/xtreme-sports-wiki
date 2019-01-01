import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

export default function ({data}) {
  const LETTERS = "#abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
  return (
  <Layout>
   <h1> Extreme games alphabetically</h1>
   <p>{LETTERS.map(letter=>(<a key={letter} href={'#'+letter}>[{letter}]</a>))}</p>
   {LETTERS.map(letter=>(
     <section id={letter}>
      <h2>{letter}</h2>
        { data.allMarkdownRemark.edges
        .filter(edge=>edge.node.frontmatter.title.toUpperCase().charAt(0) === letter || (!/[A-Z]/.test(edge.node.frontmatter.title.toUpperCase().charAt(0))) && letter === '#')
        .sort()
        .map(edge=>(
          <li key={edge.node.fields.slug}><Link to={edge.node.fields.slug} dangerouslySetInnerHTML={{ __html: edge.node.frontmatter.title}}></Link></li>
        ))
        }
     </section>
   ))}
  </Layout>
)
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          },
          fields {
              slug
          }
          excerpt
        }
      }
    }
  }
`