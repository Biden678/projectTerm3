import React, { useContext } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Fact from './components/Fact';
import About from './components/components_body/About';
import Insurances from './components/components_body/Insurances';
import Testimonial from './components/components_body/Testimonial';
import Contact from './components/components_body/Contact';
import Footer from './components/Footer';
import { AuthContext } from '../contexts/AuthContext';

function AboutUsPage(props) {

    const { navigate } = useContext(AuthContext)
    
    // navigate("/")

    return (
        <div>
            <Header/>
            
            <About/>
            
            <Footer/>
        </div>
    );
}

export default AboutUsPage;