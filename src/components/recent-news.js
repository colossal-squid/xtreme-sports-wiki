
import React from "react"
import {StaticQuery, graphql, Link} from "gatsby";

export default function RecentNews() {
    return (<StaticQuery query={graphql`
    query {
      allMarkdownRemark(
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
                written
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
            <section>{data.allMarkdownRemark.edges.sort((e1, e2)=>{
              return new Date(e2.node.frontmatter.written).getTime() - new Date(e1.node.frontmatter.written).getTime();
            }).map(edge => (<div key={edge.node.id}> 
                <span>{edge.node.frontmatter.written}</span>
                <Link to={edge.node.fields.slug}><h5 style={{"display": "inline", "marginLeft": "10px"}} > {edge.node.frontmatter.title}</h5></Link>
                <p>{edge.node.excerpt}</p>
            </div>))}</section>
        }
    />)
}