import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function ComingSoonPage(props) {
    return (
        <div>
            <Header/>
            <h1 style={{margin:'100px 0 100px 27%', fontSize:'100px'}}>
                Coming Soon...
            </h1>
            <Footer/>
        </div>
    );
}

export default ComingSoonPage;