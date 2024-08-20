import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InformationCustomer from './components/InformationCustomer';

function InformationCustomerPage(props) {
    return (
        <div>
            <Header/>
            
            <InformationCustomer/>
            
            <Footer/>
        </div>
    );
}

export default InformationCustomerPage;