import PageHeader from "../../components/common/PageHeader";

import ContributionCard from "../../components/payment/ContributionCard";

import "../../components/payment/Payment.css";


function Contribution() {

    return (

        <div className="page-container contribution-page">

            <PageHeader

                title="Support the Platform"

                subtitle="Your optional contribution helps us improve and maintain the AI Interview Platform."

            />


            <ContributionCard />

        </div>

    );

}


export default Contribution;