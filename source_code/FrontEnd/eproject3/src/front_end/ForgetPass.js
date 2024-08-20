import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ForgetPassUI from './components/ForgetPassUI';

function ForgetPassPage(props) {
    return (
        <div>
            <Header />
            <ForgetPassUI/>
            <Footer />
        </div>
    );
}

export default ForgetPassPage;