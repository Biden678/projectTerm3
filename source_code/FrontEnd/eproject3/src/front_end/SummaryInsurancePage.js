import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InsuranceSummary from './components/components_body/InsuranceSummary';

function SummaryInsurancePage(props) {


    return (
        <div>
            <Header/>

            <InsuranceSummary/>

            <Footer/>
        </div>
    );
}

export default SummaryInsurancePage;