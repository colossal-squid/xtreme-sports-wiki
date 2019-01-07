import React from "react"
import {Link} from "gatsby";
import styles from "./layout.module.css"

export default ({ children, nav }) => (
  <React.Fragment>
      <nav className={styles.nav}>
          <Link to="../">Extreme Sports Wiki</Link>
          { !!nav ? (<React.Fragment><span>→</span><Link to={nav.url}>{nav.title}</Link></React.Fragment>) : '' }
      </nav>
      <div className={styles.layout}>
        {children}
      </div>
  </React.Fragment>
)