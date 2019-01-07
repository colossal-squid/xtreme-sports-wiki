
import React from "react"
import Helmet from 'react-helmet'
import {StaticQuery, graphql, Link} from "gatsby";

export default function RecentNews() {
    return (<StaticQuery query={graphql`
    query {
        allMarkdownRemark(
          sort:{
            order: DESC
            fields: [
              frontmatter___date
            ]
          },
          filter: {
          fields : {
            folder: {
              eq: "/articles"
            }
          }
        }) {
            edges {
              node {
                
                id,
                excerpt,
                frontmatter {
                  title,
                  date
                },
                fields {
                  slug
                }
              }
            }
          }
      }`
        }
        render={ (data) =>
            <section>{data.allMarkdownRemark.edges.map(edge => (<div key={edge.node.id}> 
                <span>{edge.node.frontmatter.date}</span>
                <Link to={edge.node.fields.slug}><h5 style={{"display": "inline", "marginLeft": "10px"}} > {edge.node.frontmatter.title}</h5></Link>
                <p>{edge.node.excerpt}</p>
            </div>))}</section>
        }
    />)
}