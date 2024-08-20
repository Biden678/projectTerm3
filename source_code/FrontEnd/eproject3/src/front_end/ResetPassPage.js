import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ResetPassUI from './components/ResetPassUI';

function ResetPassPage(props) {
    return (
        <div>
            <Header/>
            <ResetPassUI/>
            <Footer/>
        </div>
    );
}

export default ResetPassPage;