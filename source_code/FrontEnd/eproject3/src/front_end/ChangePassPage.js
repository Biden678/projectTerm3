import React from 'react';
import ChangePass from './components/ChangePass';
import Header from './components/Header';
import Footer from './components/Footer';

function ChangePassPage(props) {
    return (
        <div>
            <Header/>
            
            <ChangePass/>
            
            <Footer/>
        </div>
    );
}

export default ChangePassPage;