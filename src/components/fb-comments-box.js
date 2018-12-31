
import React from "react"
import Helmet from 'react-helmet'

export default function FacebookCommentsBox({ enabled, url }) {
    return !!enabled ? (
        <React.Fragment>
            <Helmet>
                <script src="http://roman-guivan.online/facebook-comments.js"></script>
            </Helmet>
            <div id="fb-root"></div>
            <div className="fb-comments" data-href={url} data-numposts="5"></div>
        </React.Fragment>
        ) : null;
}