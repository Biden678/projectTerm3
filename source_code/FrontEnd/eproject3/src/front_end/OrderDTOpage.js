import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderDTO from './components/OrderDTO';

function OrderDTOpage(props) {
    return (
        <div>
            <Header />

            <OrderDTO />

            <Footer />
        </div>
    );
}

export default OrderDTOpage;