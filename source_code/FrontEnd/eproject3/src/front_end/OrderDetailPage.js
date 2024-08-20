import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderDetail from './components/OrderDetail';

function OrderDetailPage(props) {
    //orderDetail
    return (
        <div>
            <Header />

            <OrderDetail />

            <Footer />
        </div>
    );
}

export default OrderDetailPage;