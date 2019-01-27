import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";
import Meta from "../components/meta"

export default function ({data}) {
  return (
    <React.Fragment>
    <Meta title={"Extreme sports games wiki: Notable developers and publishers"}></Meta>
    <Layout nav={ {
      title: 'Notable developers and publishers',
      url: '/developers-and-publishers/',
    } }>
   <h1>Notable developers and publishers</h1>
   <p>Work in progress here. [WIP][WIP][WIP]</p>
  </Layout>
  </React.Fragment>
)
}

// export const query = graphql`
//   query {
//     allMarkdownRemark(filter: {
//       fields : {
//         folder: {
//           eq: "/games"
//         }
//       }
//     }) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//           },
//           fields {
//               slug
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `