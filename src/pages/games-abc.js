import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

export default function ({data}) {
  const LETTERS = "#abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
  const isNonChar = (edge, letter)=>(!/[A-Z]/.test(edge.node.frontmatter.title.toUpperCase().charAt(0))) && letter === '#';
  return (
    <Layout nav={ {
      title: 'Extreme games alphabetically',
      url: '/games-abc/',
    } }>
   <h1> Extreme games alphabetically</h1>
   <p>{LETTERS.map(letter=>(<a key={letter} href={'#'+letter}>[{letter}]</a>))}</p>
   {LETTERS.map(letter=>(
     <section id={letter}>
      <h2>{letter}</h2>
        { data.allMarkdownRemark.edges
        .filter(edge=>(edge.node.frontmatter.title.toUpperCase().charAt(0) === letter || isNonChar(edge, letter)))
        .sort((edge1, edge2)=>{
          return edge1.node.frontmatter.title > edge2.node.frontmatter.title ? 1 : -1;
        })
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
    allMarkdownRemark(filter: {
      fields : {
        folder: {
          eq: "/games"
        }
      }
    }) {
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