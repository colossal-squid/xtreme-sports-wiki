import React from "react"
import { Helmet } from "react-helmet"

export default ({title}) => (
    <Helmet 
        title={title}
        meta={[{
            name: "fb:app_id",
            content: "1135409286614400"
          },{
              name: "google-site-verification",
              content: "H_F5yFXO4_1t2jbOWun82_Fn6D0TKB1nqZfB4Bzq8pA"
          }]}>
    </Helmet>
)