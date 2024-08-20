import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Insurances from './components/components_body/Insurances';
import Fact from './components/Fact';

function InsurancesTypePage(props) {


    return (
        <div>
            <Header/>

            <Fact />
            <Insurances/>

            <Footer/>
        </div>
    );
}

export default InsurancesTypePage;