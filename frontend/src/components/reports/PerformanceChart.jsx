import {

    BarChart,

    Bar,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    ResponsiveContainer

} from "recharts";

import "./Reports.css";


function PerformanceChart({

    resumeScore,

    interviewScore,

    overallScore

}) {


    const data = [

        {
            name: "Resume",
            score: resumeScore
        },

        {
            name: "Interview",
            score: interviewScore
        },

        {
            name: "Overall",
            score: overallScore
        }

    ];


    return (

        <div className="chart-card">

            <div className="chart-header">

                <div>

                    <h2>
                        Performance Comparison
                    </h2>

                    <p>
                        Compare your resume and interview performance.
                    </p>

                </div>

            </div>


            <div className="chart-container">

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <BarChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />


                        <XAxis
                            dataKey="name"
                        />


                        <YAxis
                            domain={[0, 100]}
                        />


                        <Tooltip />


                        <Bar

                            dataKey="score"

                            radius={[8, 8, 0, 0]}

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}


export default PerformanceChart;