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
   <p>My personal effort to document some of the games "inspired" by Tony Hawk's Pro Skater, SSX, Wave Race and other "EXTREME" games.</p>
   <p>I'm especially into the stuff from Neversoft, Z-Axis, EA Big, Activision O2. Some of the tiles listed have literally nothing to do with extreme sports, yet their mechanics sort of are. Feel free to put my XTREME criteria into question.</p>
   <p> So far I have <u><b>{data.allMarkdownRemark.totalCount}</b></u> titles listed, slowly moderating the content myself</p>
   <ul>
      <li><a href="/games-by-sport/">Extreme games by sport</a></li>
      <li><Link to="/games-abc/">Extreme games alphabetically</Link></li>
      <li><a href="/games-mechanics/">Extreme games by mechanics</a></li>
      {/* <li><a href="/developers-and-publishers/">Developers and Publishers</a></li> */}
   </ul>
   <h2>XTREME links and resources (shoutout to my boyz!)</h2>
   Please visit <Link to="/additional-resources/">this page</Link> for list of similar resources, forums and all sorts of things that are worth mentioning.
   The list is WIP (as rest of the website), it has some letsplayers dedicated to ssx/thps, people modding the games, relevant blogs and more.
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