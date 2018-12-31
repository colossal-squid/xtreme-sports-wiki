import React from "react"
import { Helmet } from "react-helmet"

export default ({title}) => (
    <Helmet 
        title={title}
        meta={[{
            name: "fb:app_id",
            content: "1135409286614400"
          }]}>
    </Helmet>
)