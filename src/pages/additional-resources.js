import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

export default function ({data}) {

  return (
  <Layout>
   <h1> XTREME places on the web</h1>
   <p>I'm really excited for this one!</p>
   <ul>
       <li>
           <p><a target="_blank" href="https://www.youtube.com/user/Insetik47">Insetik47</a> DA MAN doing his letsplay SHOWS of EVERY GAME EXTREME for years and years in the row! Also check out his music, it's pretty cool! His fun threads on somethingawful: <a href="https://forums.somethingawful.com/showthread.php?threadid=3496708" target="_blank">old thread</a> and <a href="https://forums.somethingawful.com/showthread.php?threadid=3712302" target="_blank">newer one</a> - can't stop re-reading these</p>
           <p>And if you're into his stuff - check out <a target="_blank" href="https://www.youtube.com/user/TylerLasagna">Tyler Lasagna</a> - DA MAN FROM THPSX.com himself </p>
        </li>
        <li> <a href="http://thpsx.com/" target="_blank">http://thpsx.com/</a> the biggest, oldest resource on everything tony hawk</li>
        <li><a target="_blank" href="http://heckyeahextremesportsgames.tumblr.com">heckyeahextremesportsgames</a> - the cool tumblr blog with the news on extreme sports games</li>
        <li> <a href="https://reddit.com/r/THPS/" target="_blank">THPS reddit channel</a> </li>
        <li> <a href="https://reddit.com/r/ssx/" target="_blank">SSX reddit channel</a> </li>
   </ul>
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