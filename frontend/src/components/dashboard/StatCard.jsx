import "./Dashboard.css";


function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    loading = false
}) {

    return (

        <div className="stat-card">

            <div className="stat-card-top">

                <div>

                    <p className="stat-title">
                        {title}
                    </p>

                    <h2 className="stat-value">

                        {
                            loading
                                ? "--"
                                : value
                        }

                    </h2>

                </div>


                <div className="stat-icon">

                    <Icon size={24} />

                </div>

            </div>


            {
                subtitle && (

                    <p className="stat-subtitle">
                        {subtitle}
                    </p>

                )
            }

        </div>

    );

}


export default StatCard;