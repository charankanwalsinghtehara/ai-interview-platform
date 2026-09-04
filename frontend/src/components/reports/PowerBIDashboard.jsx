import {
    BarChart3,
    ExternalLink
} from "lucide-react";

import "./Reports.css";


function PowerBIDashboard() {

    /*
    Later we will replace this with your
    actual Power BI Publish to Web URL.
    */

    const powerBIUrl = "";


    return (

        <div className="powerbi-card">


            <div className="powerbi-header">

                <div>

                    <div className="powerbi-title">

                        <BarChart3 size={24} />

                        <h2>
                            Advanced Analytics Dashboard
                        </h2>

                    </div>


                    <p>
                        Explore your career and performance
                        analytics using Power BI.
                    </p>

                </div>


                {
                    powerBIUrl && (

                        <a

                            href={powerBIUrl}

                            target="_blank"

                            rel="noreferrer"

                            className="powerbi-open"

                        >

                            Open Dashboard

                            <ExternalLink
                                size={17}
                            />

                        </a>

                    )
                }

            </div>


            {
                powerBIUrl

                    ? (

                        <iframe

                            title="Power BI Career Analytics"

                            src={powerBIUrl}

                            width="100%"

                            height="600"

                            frameBorder="0"

                            allowFullScreen

                        />

                    )

                    : (

                        <div className="powerbi-placeholder">

                            <BarChart3 size={55} />

                            <h3>
                                Power BI Dashboard
                            </h3>

                            <p>
                                Your interactive Power BI dashboard
                                will appear here after publishing it.
                            </p>

                        </div>

                    )
            }

        </div>

    );

}


export default PowerBIDashboard;