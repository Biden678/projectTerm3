import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WarrantyPolicyCustomer from './components/components_body/WarrantyPolicyCustomer';

function WarrantyPolicy(props) {
    return (
        <div>
            <Header />

            <WarrantyPolicyCustomer/>

            <Footer />
        </div>
    );
}

export default WarrantyPolicy;