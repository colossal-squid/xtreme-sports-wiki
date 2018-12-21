import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";
import style from "./games-by-sport.module.css"
import { Grid, Row, Col } from 'react-material-responsive-grid';

export default function ({data}) {

  const SPORTS = [
    'Skateboarding', 'BMX', 'Inline skates', 'Snowboarding', 'Mountain bike', 'Ski', 'Surfing', "Snowmobile", "Jet Ski", "Wakeboarding", "ATV", "MTX", "Scooter", "Boat racing", 'Other'
  ];

  const SCREENSHOTS = [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/jrenydprb7xt8ovfu2l8.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/pnbdrapn0iaovz06po7y.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/cgsbueompfx6z4q0cjnt.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/wuiez4gxdysmihmb5per.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/agydstahnqmrlpallcx4.jpg',
    'https://i.ytimg.com/vi/xzN-cTKY4bo/hqdefault.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/ltlpnn3ftoqyzjiuim5x.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/j8drjcsohfdnca73yqdv.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/envlnwsuhrbl95grlabo.jpg',
    'https://www.ggmania.com/pics/bawakeboarding/bawakeboarding09.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/g1enchzzkxcwcwk5swsy.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/jx6egu1wvmfihmhbtz4c.jpg',
    'http://coolrom.com/screenshots/psx/Razor%20Racing%20(2).jpg',
    'http://images.igdb.com/igdb/image/upload/t_cover_big/crz2fazzh9vun4o86scy.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/l1fj2ineznf2iw8cfzzt.jpg'
  ];
  return (
  <Layout>
   <h1> Extreme games by sport</h1>
   <Grid>
    <Row>
        {SPORTS.map(sport=>(<Col xs4={4} sm={6} md={4} lg={2}>
                              <a className={style.blocky} href={'#'+sport}>[{sport}]
                                <img className={style.img} alt={"screenshot-" + sport} src={SCREENSHOTS[ SPORTS.indexOf(sport) ]} />
                              </a>
                            </Col>))}
    </Row>
   </Grid>
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