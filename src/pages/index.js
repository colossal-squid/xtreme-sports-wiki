import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";
import RecentNews from "../components/recent-news"
import Meta from "../components/meta"

export default ({data}) => (
  <React.Fragment>
  <Meta title={"Extreme sports games wiki"}></Meta>
  <Layout>
   <img src="logo.png" style={{ "display" : "flex", "margin" : "auto", "paddingBottom": "10px" }} alt="Extreme sports games wiki!"/>
   <p>Not really a wiki since i'm not using mediawiki engine or a similar alternative </p>
   <p>I had this urge to document some of the games "inspired" by Tony Hawk's Pro Skater, SSX, Wave Race and other "EXTREME" games. Some of the tiles listed have literally nothing to do with extreme sports, yet their mechanics sort of are. Feel free to put my XTREME criteria into question.</p>
   <p> So far I have {data.allMarkdownRemark.totalCount} poorly listed, slowly moderating the content myself</p>
   <ul>
      <li><a href="/games-by-sport/">Extreme games by sport</a></li>
      <li><Link to="/games-abc/">Extreme games alphabetically</Link></li>
      <li><a href="/games-mechanics/">Extreme games by mechanics</a></li>
   </ul>
   <h2>XTREME links and resources (shoutout to my boyz!)</h2>
   Please visit <Link to="/additional-resources/">this page</Link> for list of similar resources, forums and all sorts of things that are worth mentioning.
   The list is WIP (as rest of the website), it has some letsplayer dedicated to ssx/thps, people modding the games and so on.
   <section>
   <h2>Recent XTREME news!</h2>
   <RecentNews></RecentNews>
   <Link to="/">See older news..</Link>
   </section>
  </Layout>
  </React.Fragment>
)

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
          }
          excerpt
        }
      }
    }
  }
`