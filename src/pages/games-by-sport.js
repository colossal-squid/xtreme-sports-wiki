import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

export default function ({data}) {
  const SPORTS = ['Skateboarding', 'BMX', 'Inline skates', 'Snowboarding', 'Ski', 'Surfing', 'Other'];
  return (
  <Layout>
   <h1> Extreme games by sport</h1>
   <p>{SPORTS.map(sport=>(<a href={'#'+sport}>[{sport}]</a>))}</p>
   {SPORTS.map(sport=>(
     <section id={sport}>
      <h2>{sport}</h2>
        { data.allMarkdownRemark.edges.filter(edge=>(
          (edge.node.frontmatter.sports||"").split(',').includes(sport) || (sport==='Other' && !edge.node.frontmatter.sports)
        )).map(edge=>(
          <li><Link to={edge.node.fields.slug} dangerouslySetInnerHTML={{ __html: edge.node.frontmatter.title}}></Link></li>
        )) }
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
            title,
            sports
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