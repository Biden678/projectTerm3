import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InsurancesForm from './components/components_body/InsurancesForm';

function InsurancesPage(props) {


    return (
        <div>
            <Header/>
            
            <InsurancesForm/>

            <Footer/>
        </div>
    );
}

export default InsurancesPage;